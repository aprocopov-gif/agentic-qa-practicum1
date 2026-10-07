import { type Locator, type Page } from '@playwright/test';

export class GuestLinkPanelComponent {
  readonly root: Locator;
  readonly label: Locator;
  readonly guestLink: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.label = page.getByText('Guest link:', { exact: true });
    this.root = this.label.locator('..');
    this.guestLink = this.root.getByText(/\/e\//);
    this.copyButton = this.root.getByRole('button', { name: 'copy', exact: true });
  }

  /** Copies the guest RSVP link. */
  async copy(): Promise<void> {
    await this.copyButton.click();
  }
}
