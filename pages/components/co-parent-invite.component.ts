import { type Locator, type Page } from '@playwright/test';

export class CoParentInviteComponent {
  readonly root: Locator;
  readonly label: Locator;
  readonly inviteLink: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.label = page.getByText('Co-parent invite:', { exact: true });
    this.root = this.label.locator('..');
    this.inviteLink = this.root.getByText(/\/join\//);
    this.copyButton = this.root.getByRole('button', { name: 'copy', exact: true });
  }

  /** Copies the co-parent invite link. */
  async copy(): Promise<void> {
    await this.copyButton.click();
  }
}
