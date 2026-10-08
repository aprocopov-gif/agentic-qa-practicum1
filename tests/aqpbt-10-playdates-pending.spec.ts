import { type Locator } from '@playwright/test';

import { test, expect } from '../fixtures/cleanup.fixture';
import { PlaydatesPage } from '../pages/playdates.page';
import { ALT_AUTH_FILE } from '../support/auth.constants';
import { playdatesPendingObserved } from '../test-data/factories/playdates-pending.factory';
import { invalidPlaydatesPending } from '../test-data/invalid-playdates-pending';
import { PlaydateCircleFamily } from '../test-data/playdates-propose.enums';
import { AppRoute } from '../test-data/routes';

const newPlaydateUrl = new RegExp(`${AppRoute.NewPlaydate.replace('/', '\\/')}(\\/|\\?|$)`);

async function expectNoPendingActionsOnRow(playdates: PlaydatesPage, row: Locator): Promise<void> {
  await expect(playdates.acceptButtonIn(row)).toHaveCount(0);
  await expect(playdates.declineButtonIn(row)).toHaveCount(0);
  await expect(playdates.cancelButtonIn(row)).toHaveCount(0);
}

test.describe('AQPBT-10 playdates pending requests (Family A)', () => {
  test('Playdates shows Find a playdate intro and Pending requests @smoke', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.heading).toHaveText(playdatesPendingObserved.heading);
    await expect(playdates.intro).toHaveText(playdatesPendingObserved.intro);
    await expect(playdates.pendingRequestsLabel).toHaveText(playdatesPendingObserved.pendingLabel);
  });

  test('empty Pending requests shows count 0 and empty copy @sanity', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(
      playdates.listCountBeside(playdates.pendingRequestsLabel, playdatesPendingObserved.emptyCount),
    ).toBeVisible();
    await expect(playdates.noPendingRequests).toHaveText(playdatesPendingObserved.pendingEmptyCopy);
  });

  test('Find a playdate route shows the same empty Pending requests @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();

    await expect(page).toHaveURL(newPlaydateUrl);
    await expect(playdates.pendingRequestsLabel).toHaveText(playdatesPendingObserved.pendingLabel);
    await expect(
      playdates.listCountBeside(playdates.pendingRequestsLabel, playdatesPendingObserved.emptyCount),
    ).toBeVisible();
    await expect(playdates.noPendingRequests).toHaveText(playdatesPendingObserved.pendingEmptyCopy);
  });

  test('Cancelled Past rows have no Accept, Decline, or cancel @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRow(PlaydateCircleFamily.Nguyens);

    await playdates.goto();

    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesPendingObserved.cancelledStatus);
    await expectNoPendingActionsOnRow(playdates, row);
  });

  test('empty Upcoming is still shown next to empty Pending requests @api', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.pendingRequestsLabel).toHaveText(playdatesPendingObserved.pendingLabel);
    await expect(playdates.noPendingRequests).toHaveText(playdatesPendingObserved.pendingEmptyCopy);
    await expect(playdates.upcomingLabel.first()).toHaveText(playdatesPendingObserved.upcomingLabel);
    await expect(playdates.noUpcomingPlaydates).toHaveText(playdatesPendingObserved.upcomingEmptyCopy);
  });

  test('banner Notifications shows no pending inbox @e2e', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();
    await playdates.header.openNotifications();

    await expect(playdates.header.noNewNotifications).toHaveText(
      playdatesPendingObserved.noNewNotifications,
    );
  });
});

test('Family B gate hides Pending requests @regression', async ({ browser }) => {
  const context = await browser.newContext({ storageState: ALT_AUTH_FILE });
  const page = await context.newPage();
  try {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.dashboardGateMessage).toContainText(
      invalidPlaydatesPending.dashboardNotSetUpMessage,
    );
    await expect(playdates.pendingRequestsLabel).toHaveCount(0);
    await expect(playdates.noPendingRequests).toHaveCount(0);
  } finally {
    await context.close();
  }
});
