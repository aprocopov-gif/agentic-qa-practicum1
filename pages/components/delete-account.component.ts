import { type Locator, type Page } from '@playwright/test';

export class DeleteAccountComponent {
  readonly root: Locator;
  readonly confirmation: Locator;
  readonly password: Locator;
  readonly deleteForeverButton: Locator;
  readonly keepAccountButton: Locator;

  constructor(page: Page) {
    this.confirmation = page.getByText('Confirm with your password to permanently delete everything.', {
      exact: true,
    });
    this.root = this.confirmation.locator('..');
    this.password = this.root.getByRole('textbox', { name: 'Your password', exact: true });
    this.deleteForeverButton = this.root.getByRole('button', { name: 'Delete forever', exact: true });
    this.keepAccountButton = this.root.getByRole('button', { name: 'Keep my account', exact: true });
  }

  /** Fills the password confirmation. */
  async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  /** Submits account deletion. */
  async submit(): Promise<void> {
    await this.deleteForeverButton.click();
  }

  /** Keeps the account and closes the confirmation. */
  async cancel(): Promise<void> {
    await this.keepAccountButton.click();
  }
}
