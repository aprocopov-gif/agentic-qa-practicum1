import { type Locator, type Page } from '@playwright/test';

export class ProfileDetailsFormComponent {
  readonly root: Locator;
  readonly displayName: Locator;
  readonly phone: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Save my details', exact: true });
    this.root = this.submitButton.locator('..');
    this.displayName = page.getByRole('textbox', {
      name: 'Display name (how your circle sees you)',
      exact: true,
    });
    this.phone = page.getByRole('textbox', { name: 'Phone (optional)', exact: true });
  }

  /** Fills display name and phone. */
  async fill(displayName: string, phone: string): Promise<void> {
    await this.displayName.fill(displayName);
    await this.phone.fill(phone);
  }

  /** Saves personal details. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
