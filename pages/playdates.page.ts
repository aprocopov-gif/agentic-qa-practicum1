import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { HeaderComponent } from './components/header.component';
import { ProposePlaydateFormComponent } from './components/propose-playdate-form.component';

export class PlaydatesPage {
  readonly header: HeaderComponent;
  readonly proposePlaydateForm: ProposePlaydateFormComponent;
  readonly title: Locator;
  readonly heading: Locator;
  readonly noPendingRequests: Locator;
  readonly noUpcomingPlaydates: Locator;
  readonly googleLink: Locator;
  readonly icsButton: Locator;
  readonly cancelButton: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.proposePlaydateForm = new ProposePlaydateFormComponent(page);
    this.title = this.header.banner.getByText('Playdates', { exact: true });
    this.heading = page.getByRole('heading', { name: 'Find a playdate', exact: true });
    this.noPendingRequests = page.getByText('No pending requests.', { exact: true });
    this.noUpcomingPlaydates = page.getByText('No upcoming playdates yet.', { exact: true });
    this.googleLink = page.getByRole('link', { name: 'Google', exact: true });
    this.icsButton = page.getByRole('button', { name: 'ICS', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'cancel', exact: true });
  }

  /** Opens the playdates page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Playdates);
  }

  /** Opens the same playdate form at /playdates/new. */
  async gotoNew(): Promise<void> {
    await this.page.goto(AppRoute.NewPlaydate);
  }
}
