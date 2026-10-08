import type { Page, Route } from '@playwright/test';

const AVAILABILITY_LIST_PATTERN = '**/api/v1/availability';
const ME_PATTERN = '**/api/v1/me';

interface MePayload {
  family?: {
    children?: unknown[];
  };
}

async function fulfillJson(route: Route, status: number, body: unknown): Promise<void> {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

/** Forces GET /api/v1/availability to return an empty weekly + exceptions payload. */
export async function mockAvailabilityListEmpty(page: Page): Promise<void> {
  await page.route(AVAILABILITY_LIST_PATTERN, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, 200, {
      weekly: [],
      exceptions: [],
    });
  });
}

/** Forces GET /api/v1/availability to fail with a server error. */
export async function mockAvailabilityListServerError(page: Page): Promise<void> {
  await page.route(AVAILABILITY_LIST_PATTERN, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, 500, { error: 'mock availability list failure' });
  });
}

/** Forces GET /api/v1/me to return no children (family list empty). */
export async function mockFamilyChildrenEmpty(page: Page): Promise<void> {
  await page.route(ME_PATTERN, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    const response = await route.fetch();
    const body = (await response.json()) as MePayload;
    if (body.family) {
      body.family.children = [];
    }
    await route.fulfill({
      status: response.status(),
      headers: response.headers(),
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

/** Forces GET /api/v1/me to fail with a server error. */
export async function mockFamilyMeServerError(page: Page): Promise<void> {
  await page.route(ME_PATTERN, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, 500, { error: 'mock me failure' });
  });
}

/** Prefix for ids returned from mocked create responses (ignored by the cleanup fixture). */
export const MOCK_RECORD_ID_PREFIX = 'mock-';
