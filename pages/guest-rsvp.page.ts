import { type Locator, type Page } from '@playwright/test';
import { guestRsvpRoute } from '../test-data/routes';

export class GuestRsvpPage {
  readonly brand: Locator;
  readonly partyHeading: Locator;
  readonly hostedBy: Locator;
  readonly cancelledMessage: Locator;
  readonly tryBuddyTimeLink: Locator;
  readonly privacyLink: Locator;

  constructor(private readonly page: Page) {
    this.brand = page.getByText('BuddyTime', { exact: true });
    this.partyHeading = page.getByRole('heading', { level: 2 });
    this.hostedBy = page.getByText(/^Hosted by /);
    this.cancelledMessage = page.getByText('This party was cancelled.', { exact: true });
    this.tryBuddyTimeLink = page.getByRole('link', { name: 'try BuddyTime', exact: true });
    this.privacyLink = page.getByRole('link', { name: 'privacy', exact: true });
  }

  /** Opens the public guest RSVP page. */
  async goto(token: string): Promise<void> {
    await this.page.goto(guestRsvpRoute(token));
  }
}
