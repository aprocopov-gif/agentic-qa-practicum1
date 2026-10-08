import { type Locator } from '@playwright/test';

import { test, expect } from '../fixtures/cleanup.fixture';
import { DashboardPage } from '../pages/dashboard.page';
import { PlaydatesPage } from '../pages/playdates.page';
import { ALT_AUTH_FILE } from '../support/auth.constants';
import { playdatesListsObserved } from '../test-data/factories/playdates-lists.factory';
import { invalidPlaydatesLists } from '../test-data/invalid-playdates-lists';
import { AppRoute } from '../test-data/routes';

const playdatesUrl = new RegExp(`${AppRoute.Playdates.replace('/', '\\/')}(\\/|\\?|$)`);
const newPlaydateUrl = new RegExp(`${AppRoute.NewPlaydate.replace('/', '\\/')}(\\/|\\?|$)`);

async function expectNoRowActions(playdates: PlaydatesPage, row: Locator): Promise<void> {
  await expect(playdates.googleLinkIn(row)).toHaveCount(0);
  await expect(playdates.icsButtonIn(row)).toHaveCount(0);
  await expect(playdates.acceptButtonIn(row)).toHaveCount(0);
  await expect(playdates.declineButtonIn(row)).toHaveCount(0);
  await expect(playdates.cancelButtonIn(row)).toHaveCount(0);
}

test.describe('AQPBT-11 playdates upcoming and past lists (Family A)', () => {
  test('Playdates shows Find a playdate, Upcoming, and Past @smoke', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.heading).toHaveText(playdatesListsObserved.heading);
    await expect(playdates.upcomingLabel.first()).toHaveText(playdatesListsObserved.upcomingLabel);
    await expect(playdates.pastLabel.first()).toHaveText(playdatesListsObserved.pastLabel);
  });

  test('empty Upcoming shows count 0 and empty copy @sanity', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(
      playdates.listCountBeside(playdates.upcomingLabel, playdatesListsObserved.emptyCount),
    ).toBeVisible();
    await expect(playdates.noUpcomingPlaydates).toHaveText(playdatesListsObserved.upcomingEmptyCopy);
  });

  test('Past lists cancelled rows with family, date, child, and status @sanity', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateFriOct16);

    await playdates.goto();

    await expect(
      playdates.listCountBeside(playdates.pastLabel, playdatesListsObserved.pastCount),
    ).toBeVisible();
    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesListsObserved.familyNguyen);
    await expect(row).toContainText(playdatesListsObserved.childMia);
    await expect(row).toContainText(playdatesListsObserved.cancelledStatus);
  });

  test('Find a playdate route shows the same Upcoming and Past @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();

    await expect(page).toHaveURL(newPlaydateUrl);
    await expect(
      playdates.listCountBeside(playdates.upcomingLabel, playdatesListsObserved.emptyCount),
    ).toBeVisible();
    await expect(playdates.noUpcomingPlaydates).toHaveText(playdatesListsObserved.upcomingEmptyCopy);
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateFriOct16),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateThuOct15),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateSunOct11),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateFriOct9),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateThuOct8),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateTueSep29),
    ).toBeVisible();
  });

  test('clicking a Cancelled Past row stays on Playdates without actions @regression', async ({
    page,
  }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRow(playdatesListsObserved.familyNguyen);

    await playdates.goto();
    await playdates.viewCancelledPastRow(playdatesListsObserved.familyNguyen);

    await expect(page).toHaveURL(playdatesUrl);
    await expectNoRowActions(playdates, row);
  });

  test('Past row can include a place after a middle dot @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateThuOct15);

    await playdates.goto();

    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesListsObserved.childMaria);
    await expect(row).toContainText(playdatesListsObserved.cancelledStatus);
  });

  test('Past includes the Oct 9 cancelled probe row @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateFriOct9);

    await playdates.goto();

    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesListsObserved.familyNguyen);
    await expect(row).toContainText(playdatesListsObserved.cancelledStatus);
  });

  test('Dashboard View all opens Playdates lists @e2e', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const playdates = new PlaydatesPage(page);

    await dashboard.goto();
    await dashboard.openAllPlaydates();

    await expect(page).toHaveURL(playdatesUrl);
    await expect(playdates.upcomingLabel.first()).toHaveText(playdatesListsObserved.upcomingLabel);
    await expect(playdates.pastLabel.first()).toHaveText(playdatesListsObserved.pastLabel);
  });

  test('Past rows appear newest-first @api', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const newest = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateFriOct16);
    const middle = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateThuOct15);
    const oldest = playdates.cancelledPastRowByDate(playdatesListsObserved.pastDateSunOct11);

    await playdates.goto();

    const newestBox = await newest.boundingBox();
    const middleBox = await middle.boundingBox();
    const oldestBox = await oldest.boundingBox();

    expect(newestBox).not.toBeNull();
    expect(middleBox).not.toBeNull();
    expect(oldestBox).not.toBeNull();
    expect(newestBox!.y).toBeLessThan(middleBox!.y);
    expect(middleBox!.y).toBeLessThan(oldestBox!.y);
  });
});

test('Family B gate on Playdates hides Upcoming and Past @regression', async ({ browser }) => {
  const context = await browser.newContext({ storageState: ALT_AUTH_FILE });
  const page = await context.newPage();
  try {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.dashboardGateMessage).toContainText(
      invalidPlaydatesLists.dashboardNotSetUpMessage,
    );
    await expect(playdates.upcomingLabel).toHaveCount(0);
    await expect(playdates.noUpcomingPlaydates).toHaveCount(0);
    await expect(playdates.pastLabel).toHaveCount(0);
  } finally {
    await context.close();
  }
});

test('Family B gate on Find a playdate hides Upcoming and Past @regression', async ({ browser }) => {
  const context = await browser.newContext({ storageState: ALT_AUTH_FILE });
  const page = await context.newPage();
  try {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();

    await expect(playdates.dashboardGateMessage).toContainText(
      invalidPlaydatesLists.dashboardNotSetUpMessage,
    );
    await expect(playdates.upcomingLabel).toHaveCount(0);
    await expect(playdates.pastLabel).toHaveCount(0);
  } finally {
    await context.close();
  }
});
