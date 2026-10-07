import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';

export class PrivacyPage {
  readonly heading: Locator;
  readonly backLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Privacy Policy', exact: true });
    this.backLink = page.getByRole('link', { name: '← Back to BuddyTime', exact: true });
  }

  /** Opens the privacy policy. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Privacy);
  }
}
