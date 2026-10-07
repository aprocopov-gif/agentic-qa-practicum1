import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';

export class LandingPage {
  readonly brand: Locator;
  readonly getStartedLink: Locator;
  readonly logInLink: Locator;
  readonly privacyLink: Locator;
  readonly termsLink: Locator;

  constructor(private readonly page: Page) {
    this.brand = page.getByText('BuddyTime', { exact: true });
    this.getStartedLink = page.getByRole('link', { name: 'Get started', exact: true });
    this.logInLink = page.getByRole('link', { name: 'Log in', exact: true });
    this.privacyLink = page.getByRole('link', { name: 'Privacy', exact: true });
    this.termsLink = page.getByRole('link', { name: 'Terms', exact: true });
  }

  /** Opens the landing page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Landing);
  }

  /** Opens the sign-up page from Get started. */
  async openSignUp(): Promise<void> {
    await this.getStartedLink.click();
  }

  /** Opens the log-in page. */
  async openLogIn(): Promise<void> {
    await this.logInLink.click();
  }

  /** Opens the privacy policy. */
  async openPrivacy(): Promise<void> {
    await this.privacyLink.click();
  }

  /** Opens the terms of service. */
  async openTerms(): Promise<void> {
    await this.termsLink.click();
  }
}
