import { test as base, expect } from '@playwright/test';

import { MOCK_RECORD_ID_PREFIX } from '../support/mock-api';
import {
  type RecordOwner,
  type TrackedRecordType,
  trackRecord as appendTrackedRecord,
} from '../support/record-tracker';

const CREATE_EXCEPTION_PATH = '/api/v1/availability/exceptions';
const CREATE_CHILD_PATH = '/api/v1/children';

interface IdCreateResponse {
  id: string;
}

type CleanupFixtures = {
  recordOwner: RecordOwner;
};

function pathnameEndsWith(url: string, suffix: string): boolean {
  try {
    const { pathname } = new URL(url);
    return pathname.endsWith(suffix);
  } catch {
    return url.includes(suffix);
  }
}

function shouldSkipTrackedId(id: string): boolean {
  return id.startsWith(MOCK_RECORD_ID_PREFIX);
}

async function trackCreateIfMatched(
  responseUrl: string,
  method: string,
  status: number,
  owner: RecordOwner,
  pathSuffix: string,
  expectedStatus: number,
  type: TrackedRecordType,
  readBody: () => Promise<IdCreateResponse | null>,
): Promise<void> {
  if (method !== 'POST' || status !== expectedStatus || !pathnameEndsWith(responseUrl, pathSuffix)) {
    return;
  }

  const body = await readBody();
  const id = body?.id;
  if (!id || shouldSkipTrackedId(id)) {
    return;
  }

  appendTrackedRecord({ type, id, owner });
}

async function tryTrackCreateResponses(
  responseUrl: string,
  method: string,
  status: number,
  owner: RecordOwner,
  readBody: () => Promise<IdCreateResponse | null>,
): Promise<void> {
  await trackCreateIfMatched(
    responseUrl,
    method,
    status,
    owner,
    CREATE_EXCEPTION_PATH,
    201,
    'availability_exception',
    readBody,
  );
  await trackCreateIfMatched(responseUrl, method, status, owner, CREATE_CHILD_PATH, 201, 'child', readBody);
}

export const test = base.extend<CleanupFixtures>({
  recordOwner: ['main', { option: true }],

  page: async ({ page, recordOwner }, use) => {
    const onResponse = (response: {
      url: () => string;
      status: () => number;
      request: () => { method: () => string };
      json: () => Promise<unknown>;
    }): void => {
      void tryTrackCreateResponses(
        response.url(),
        response.request().method(),
        response.status(),
        recordOwner,
        async () => {
          try {
            return (await response.json()) as IdCreateResponse;
          } catch {
            return null;
          }
        },
      );
    };

    page.on('response', onResponse);
    await use(page);
    page.off('response', onResponse);
  },
});

export { expect, appendTrackedRecord as trackRecord };
