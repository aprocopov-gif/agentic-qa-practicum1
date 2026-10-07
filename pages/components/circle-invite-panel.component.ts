import { type Locator, type Page } from '@playwright/test';

export class CircleInvitePanelComponent {
  readonly root: Locator;
  readonly label: Locator;
  readonly inviteLink: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.label = page.getByText('Circle invite:', { exact: true });
    this.root = this.label.locator('..');
    this.inviteLink = this.root.getByText(/\/join\//);
    this.copyButton = this.root.getByRole('button', { name: 'copy', exact: true });
  }

  /** Copies the circle invite link. */
  async copy(): Promise<void> {
    await this.copyButton.click();
  }
}
