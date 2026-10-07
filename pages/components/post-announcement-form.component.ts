import { type Locator, type Page } from '@playwright/test';

export class PostAnnouncementFormComponent {
  readonly root: Locator;
  readonly heading: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('New announcement', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Post announcement', exact: true });
    this.root = this.submitButton.locator('..');
    this.message = page.getByRole('textbox', {
      name: 'Share an update with every family in the group…',
      exact: true,
    });
  }

  /** Fills the announcement message. */
  async fill(message: string): Promise<void> {
    await this.message.fill(message);
  }

  /** Posts the announcement. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
