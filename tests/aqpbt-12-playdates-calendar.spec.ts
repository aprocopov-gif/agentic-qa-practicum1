import { type Locator } from '@playwright/test';

import { test, expect } from '../fixtures/cleanup.fixture';
import { CalendarPage } from '../pages/calendar.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PlaydatesPage } from '../pages/playdates.page';
import { ProfilePage } from '../pages/profile.page';
import { ALT_AUTH_FILE } from '../support/auth.constants';
import { playdatesCalendarObserved } from '../test-data/factories/playdates-calendar.factory';
import { invalidPlaydatesCalendar } from '../test-data/invalid-playdates-calendar';
import { AppRoute } from '../test-data/routes';

const playdatesUrl = new RegExp(`${AppRoute.Playdates.replace('/', '\\/')}(\\/|\\?|$)`);
const newPlaydateUrl = new RegExp(`${AppRoute.NewPlaydate.replace('/', '\\/')}(\\/|\\?|$)`);
const profileUrl = new RegExp(`${AppRoute.Profile.replace('/', '\\/')}(\\/|\\?|$)`);

async function expectNoCalendarExportOnPage(playdates: PlaydatesPage): Promise<void> {
  await expect(playdates.googleLink).toHaveCount(0);
  await expect(playdates.icsButton).toHaveCount(0);
}

async function expectNoRowActions(playdates: PlaydatesPage, row: Locator): Promise<void> {
  await expect(playdates.googleLinkIn(row)).toHaveCount(0);
  await expect(playdates.icsButtonIn(row)).toHaveCount(0);
  await expect(playdates.acceptButtonIn(row)).toHaveCount(0);
  await expect(playdates.declineButtonIn(row)).toHaveCount(0);
  await expect(playdates.cancelButtonIn(row)).toHaveCount(0);
}

test.describe('AQPBT-12 playdates calendar export (Family A)', () => {
  test('empty Upcoming on Playdates shows message without calendar export @smoke', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.title).toBeVisible();
    await expect(playdates.noUpcomingPlaydates).toHaveText(playdatesCalendarObserved.upcomingEmptyCopy);
    await expectNoCalendarExportOnPage(playdates);
  });

  test('Cancelled Past row on Playdates has no calendar or pending actions @sanity', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyNguyen);

    await playdates.goto();

    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesCalendarObserved.cancelledPastDateFriOct16);
    await expect(row).toContainText(playdatesCalendarObserved.cancelledStatus);
    await expectNoRowActions(playdates, row);
  });

  test('Find a playdate route shows empty Upcoming and cancelled Past without export @sanity', async ({
    page,
  }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();

    await expect(page).toHaveURL(newPlaydateUrl);
    await expect(playdates.noUpcomingPlaydates).toHaveText(playdatesCalendarObserved.upcomingEmptyCopy);
    await expect(
      playdates.cancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyNguyen),
    ).toBeVisible();
    await expectNoCalendarExportOnPage(playdates);
  });

  test('Profile Calendar Sync shows playdate calendar message on profile @e2e', async ({ page }) => {
    const profile = new ProfilePage(page);

    await profile.goto();
    await profile.openCalendarSync();

    await expect(page).toHaveURL(profileUrl);
    await expect(profile.calendarSyncToast).toHaveText(playdatesCalendarObserved.calendarSyncToast);
  });

  test('clicking Cancelled Past row on Playdates does not reveal calendar export @regression', async ({
    page,
  }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();
    await playdates.viewCancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyNguyen);

    await expect(page).toHaveURL(playdatesUrl);
    await expectNoCalendarExportOnPage(playdates);
  });

  test('future-dated Cancelled Past row has no calendar export @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);
    const row = playdates.cancelledPastRowByDate(playdatesCalendarObserved.cancelledPastDateThuOct15);

    await playdates.goto();

    await expect(row).toBeVisible();
    await expect(row).toContainText(playdatesCalendarObserved.cancelledStatus);
    await expectNoRowActions(playdates, row);
  });

  test('Past section lists cancelled circle families without export actions @regression', async ({ page }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.pastLabel.first()).toBeVisible();
    await expect(
      playdates.cancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyNguyen),
    ).toBeVisible();
    await expect(
      playdates.cancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyPetrov),
    ).toBeVisible();
    await expectNoCalendarExportOnPage(playdates);
  });

  test('Dashboard Upcoming Playdates widget has no Google or ICS @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const playdates = new PlaydatesPage(page);

    await dashboard.goto();

    await expect(dashboard.upcomingPlaydatesWidgetTitle).toBeVisible();
    await expect(dashboard.upcomingPlaydatesEmptyCopy).toBeVisible();
    await expect(playdates.googleLink).toHaveCount(0);
    await expect(playdates.icsButton).toHaveCount(0);
  });

  test('in-app Calendar page has no Google or ICS export controls @regression', async ({ page }) => {
    const calendar = new CalendarPage(page);
    const playdates = new PlaydatesPage(page);

    await calendar.goto();

    await expect(calendar.familyCalendar).toBeVisible();
    await expect(playdates.googleLink).toHaveCount(0);
    await expect(playdates.icsButton).toHaveCount(0);
  });

  test('clicking Cancelled Past row on Find a playdate stays on route without export @api', async ({
    page,
  }) => {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();
    await playdates.viewCancelledPastRow(playdatesCalendarObserved.cancelledPastFamilyNguyen);

    await expect(page).toHaveURL(newPlaydateUrl);
    await expectNoCalendarExportOnPage(playdates);
  });
});

test('Family B gate on Playdates hides lists and calendar export @regression', async ({ browser }) => {
  const context = await browser.newContext({ storageState: ALT_AUTH_FILE });
  const page = await context.newPage();
  try {
    const playdates = new PlaydatesPage(page);

    await playdates.goto();

    await expect(playdates.dashboardGateMessage).toContainText(
      invalidPlaydatesCalendar.dashboardNotSetUpMessage,
    );
    await expect(playdates.upcomingLabel).toHaveCount(0);
    await expect(playdates.pastLabel).toHaveCount(0);
    await expect(playdates.googleLink).toHaveCount(0);
    await expect(playdates.icsButton).toHaveCount(0);
  } finally {
    await context.close();
  }
});

test('Family B gate on Find a playdate hides lists and calendar export @regression', async ({
  browser,
}) => {
  const context = await browser.newContext({ storageState: ALT_AUTH_FILE });
  const page = await context.newPage();
  try {
    const playdates = new PlaydatesPage(page);

    await playdates.gotoNew();

    await expect(playdates.dashboardGateMessage).toContainText(
      invalidPlaydatesCalendar.dashboardNotSetUpMessage,
    );
    await expect(playdates.upcomingLabel).toHaveCount(0);
    await expect(playdates.pastLabel).toHaveCount(0);
    await expect(playdates.googleLink).toHaveCount(0);
    await expect(playdates.icsButton).toHaveCount(0);
  } finally {
    await context.close();
  }
});
