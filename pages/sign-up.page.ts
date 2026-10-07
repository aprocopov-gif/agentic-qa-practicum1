import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';

export class SignUpPage {
  readonly heading: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signUpButton: Locator;
  readonly logInLink: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Create your account', exact: true });
    this.name = page.getByRole('textbox', { name: 'Your name', exact: true });
    this.email = page.getByRole('textbox', { name: 'Email', exact: true });
    this.password = page.getByRole('textbox', { name: 'Password (8+ characters)', exact: true });
    this.signUpButton = page.getByRole('button', { name: 'Sign up', exact: true });
    this.logInLink = page.getByRole('link', { name: 'Log in', exact: true });
    this.termsLink = page.getByRole('link', { name: 'Terms of Service', exact: true });
    this.privacyLink = page.getByRole('link', { name: 'Privacy Policy', exact: true });
  }

  /** Opens the sign-up page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.SignUp);
  }

  /** Fills the name, email, and password fields. */
  async fill(name: string, email: string, password: string): Promise<void> {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.password.fill(password);
  }

  /** Submits the sign-up form. */
  async submit(): Promise<void> {
    await this.signUpButton.click();
  }

  /** Opens the log-in page. */
  async openLogIn(): Promise<void> {
    await this.logInLink.click();
  }
}
