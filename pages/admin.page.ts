import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { HeaderComponent } from './components/header.component';

export class AdminPage {
  readonly header: HeaderComponent;
  readonly title: Locator;
  readonly refreshButton: Locator;
  readonly parentsSignedUp: Locator;
  readonly activeInLast7Days: Locator;
  readonly confirmedEmails: Locator;
  readonly families: Locator;
  readonly circleConnections: Locator;
  readonly playdatesConfirmed: Locator;
  readonly partiesAndEvents: Locator;
  readonly rsvps: Locator;
  readonly groups: Locator;
  readonly safetyReports: Locator;
  readonly newParentsChart: Locator;
  readonly showAsTable: Locator;
  readonly weeklyTable: Locator;
  readonly signupsTable: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = this.header.banner.getByText('Admin', { exact: true });
    this.refreshButton = page.getByRole('button', { name: 'Refresh', exact: true });
    this.parentsSignedUp = page.getByText('Parents signed up', { exact: true });
    this.activeInLast7Days = page.getByText('Active in the last 7 days', { exact: true });
    this.confirmedEmails = page.getByText('Confirmed emails', { exact: true });
    this.families = page.getByText('Families', { exact: true });
    this.circleConnections = page.getByText('Circle connections', { exact: true });
    this.playdatesConfirmed = page.getByText('Playdates confirmed', { exact: true });
    this.partiesAndEvents = page.getByText('Parties & events', { exact: true });
    this.rsvps = page.getByText('RSVPs', { exact: true });
    this.groups = page.getByText('Groups', { exact: true });
    this.safetyReports = page.getByText('Safety reports', { exact: true });
    this.newParentsChart = page.getByRole('list', { name: 'New parents per week', exact: true });
    this.showAsTable = page.getByText('Show as table', { exact: true });
    this.weeklyTable = page.getByRole('table').filter({
      has: page.getByRole('columnheader', { name: 'Week of', exact: true }),
    });
    this.signupsTable = page.getByRole('table').filter({
      has: page.getByRole('columnheader', { name: 'Email', exact: true }),
    });
  }

  /** Opens the admin page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Admin);
  }

  /** Reloads the admin figures. */
  async refresh(): Promise<void> {
    await this.refreshButton.click();
  }

  /** Shows the weekly sign-up chart as a table. */
  async showChartAsTable(): Promise<void> {
    await this.showAsTable.click();
  }
}
