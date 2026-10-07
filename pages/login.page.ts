import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';

export class LoginPage {
  readonly heading: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly logInButton: Locator;
  readonly signUpLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Welcome back', exact: true });
    this.email = page.getByRole('textbox', { name: 'Email', exact: true });
    this.password = page.getByRole('textbox', { name: 'Password', exact: true });
    this.logInButton = page.getByRole('button', { name: 'Log in', exact: true });
    this.signUpLink = page.getByRole('link', { name: 'Sign up', exact: true });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?', exact: true });
  }

  /** Opens the log-in page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Login);
  }

  /** Fills the email field. */
  async fillEmail(email: string): Promise<void> {
    await this.email.fill(email);
  }

  /** Fills the password field. */
  async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  /** Submits the log-in form. */
  async submit(): Promise<void> {
    await this.logInButton.click();
  }

  /** Opens the sign-up page. */
  async openSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  /** Opens the forgot-password page. */
  async openForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }
}
