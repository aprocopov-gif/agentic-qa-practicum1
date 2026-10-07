import { type Locator, type Page } from '@playwright/test';
import { coParentJoinRoute } from '../test-data/routes';

export class CoParentJoinPage {
  readonly heading: Locator;
  readonly acceptInviteButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: '🧡 BuddyTime invite', exact: true });
    this.acceptInviteButton = page.getByRole('button', { name: 'Accept invite', exact: true });
  }

  /** Opens a co-parent or circle join link. */
  async goto(token: string): Promise<void> {
    await this.page.goto(coParentJoinRoute(token));
  }

  /** Accepts the family invite. */
  async accept(): Promise<void> {
    await this.acceptInviteButton.click();
  }
}
