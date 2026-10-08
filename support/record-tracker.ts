import fs from 'node:fs';
import path from 'node:path';

export const TRACKER_PATH = path.join('.test-artifacts', 'created-records.jsonl');

export type RecordOwner = 'main' | 'alt';

export type TrackedRecordType = 'availability_exception' | 'child';

export interface TrackedRecord {
  type: TrackedRecordType;
  id: string;
  owner: RecordOwner;
}

function trackerAbsolutePath(): string {
  return path.join(process.cwd(), TRACKER_PATH);
}

/** Ensures the tracker file exists and is empty. */
export function initTracker(): void {
  const filePath = trackerAbsolutePath();
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, '', 'utf8');
}

/** Appends a created record for later cleanup. */
export function trackRecord(record: TrackedRecord): void {
  const filePath = trackerAbsolutePath();
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, `${JSON.stringify(record)}\n`, 'utf8');
}

/** Returns tracked records, deduplicated by type and id (last owner wins). */
export function getTrackedRecords(): TrackedRecord[] {
  const filePath = trackerAbsolutePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const lines = fs.readFileSync(filePath, 'utf8').split('\n').filter((line) => line.trim());
  const byKey = new Map<string, TrackedRecord>();

  for (const line of lines) {
    const parsed = JSON.parse(line) as TrackedRecord;
    byKey.set(`${parsed.type}:${parsed.id}`, parsed);
  }

  return [...byKey.values()];
}
