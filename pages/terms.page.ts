import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';

export class TermsPage {
  readonly heading: Locator;
  readonly backLink: Locator;
  readonly contactLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Terms of Service', exact: true });
    this.backLink = page.getByRole('link', { name: '← Back to BuddyTime', exact: true });
    this.contactLink = page.getByRole('link', { name: 'hello@buddytime.ca', exact: true });
  }

  /** Opens the terms of service. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Terms);
  }
}
