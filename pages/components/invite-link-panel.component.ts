import { type Locator, type Page } from '@playwright/test';

export class InviteLinkPanelComponent {
  readonly root: Locator;
  readonly heading: Locator;
  readonly description: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.copyButton = page.getByRole('button', { name: 'Copy invite link', exact: true });
    this.root = this.copyButton.locator('..');
    this.heading = this.root.locator('strong');
    this.description = this.root.getByText('Share a private link. Every family still needs your approval.', {
      exact: true,
    });
  }

  /** Copies the group invite link from the panel. */
  async copy(): Promise<void> {
    await this.copyButton.click();
  }
}
