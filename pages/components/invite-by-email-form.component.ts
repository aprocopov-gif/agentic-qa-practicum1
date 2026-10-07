import { type Locator, type Page } from '@playwright/test';

export class InviteByEmailFormComponent {
  readonly root: Locator;
  readonly heading: Locator;
  readonly emails: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Invite by email', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Send invites', exact: true });
    this.root = this.submitButton.locator('..').locator('..');
    this.emails = page.getByRole('textbox', { name: 'Emails, comma-separated', exact: true });
  }

  /** Fills the guest email list. */
  async fill(emails: string): Promise<void> {
    await this.emails.fill(emails);
  }

  /** Sends email invites. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
