import dotenv from 'dotenv';

dotenv.config();

import fs from 'node:fs';
import path from 'node:path';

import { ALT_AUTH_FILE, AUTH_FILE } from '../../../../support/auth.constants';
import { deleteTrackedRecord, disposeApiContexts, getApiContext } from '../../../../support/api-client';
import {
  getTrackedRecords,
  initTracker,
  type RecordOwner,
  type TrackedRecord,
  type TrackedRecordType,
} from '../../../../support/record-tracker';

const TRACKED_TYPES: TrackedRecordType[] = ['availability_exception', 'child', 'playdate'];

interface CliOptions {
  dryRun: boolean;
  typeFilter?: TrackedRecordType;
}

function parseArgs(argv: string[]): CliOptions {
  let dryRun = false;
  let typeFilter: TrackedRecordType | undefined;

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (arg === '--type') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('--type requires a value');
      }
      if (!TRACKED_TYPES.includes(value as TrackedRecordType)) {
        throw new Error(`Unknown type "${value}". Expected one of: ${TRACKED_TYPES.join(', ')}`);
      }
      typeFilter = value as TrackedRecordType;
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return { dryRun, typeFilter };
}

function storageStatePath(owner: RecordOwner): string {
  return owner === 'main' ? AUTH_FILE : ALT_AUTH_FILE;
}

function ownersForRecords(records: TrackedRecord[]): RecordOwner[] {
  return [...new Set(records.map((record) => record.owner))];
}

function assertAuthFilesExist(owners: RecordOwner[]): void {
  const missing: string[] = [];
  for (const owner of owners) {
    const filePath = path.join(process.cwd(), storageStatePath(owner));
    if (!fs.existsSync(filePath)) {
      missing.push(storageStatePath(owner));
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing storage state: ${missing.join(', ')}. Run the Playwright setup project (auth.setup.ts) and retry.`,
    );
  }
}

function scopeLabel(options: CliOptions): string {
  const parts: string[] = [];
  if (options.typeFilter) {
    parts.push(`type=${options.typeFilter}`);
  } else {
    parts.push('all tracked');
  }
  if (options.dryRun) {
    parts.push('dry-run');
  }
  return parts.join(', ');
}

function printSummary(scope: string, found: number, deleted: number, failed: number): void {
  console.log('Scope · Found · Deleted · Failed');
  console.log(`${scope} · ${found} · ${deleted} · ${failed}`);
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv);
  const allTracked = getTrackedRecords();
  const records = options.typeFilter
    ? allTracked.filter((record) => record.type === options.typeFilter)
    : allTracked;

  const scope = scopeLabel(options);
  const found = records.length;

  if (found === 0) {
    printSummary(scope, 0, 0, 0);
    if (!options.dryRun) {
      initTracker();
    }
    return;
  }

  if (options.dryRun) {
    for (const record of records) {
      console.log(`${record.type} ${record.id} (owner=${record.owner})`);
    }
    printSummary(scope, found, 0, 0);
    return;
  }

  assertAuthFilesExist(ownersForRecords(records));

  let deleted = 0;
  let failed = 0;

  try {
    for (const record of records) {
      const apiContext = await getApiContext(record.owner);
      const result = await deleteTrackedRecord(apiContext, record);

      if (result.ok) {
        deleted += 1;
        console.log(`Deleted ${result.type} ${result.id}`);
        continue;
      }

      if (result.status === 404) {
        deleted += 1;
        console.log(`Already removed ${result.type} ${result.id} (HTTP 404)`);
        continue;
      }

      if (result.status === 401) {
        failed += 1;
        console.error(
          `Failed ${result.type} ${result.id}: HTTP 401 — storage state expired; re-run the setup project.`,
        );
        continue;
      }

      failed += 1;
      console.warn(
        `Failed ${result.type} ${result.id}: HTTP ${result.status}${result.message ? ` — ${result.message}` : ''}`,
      );
    }
  } finally {
    initTracker();
    await disposeApiContexts();
  }

  printSummary(scope, found, deleted, failed);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
