import { type Locator, type Page } from '@playwright/test';

export class CreateGroupEventFormComponent {
  readonly root: Locator;
  readonly heading: Locator;
  readonly eventTitle: Locator;
  readonly eventDateTime: Locator;
  readonly venue: Locator;
  readonly details: Locator;
  readonly invitationCard: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Create a group event', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Create event', exact: true });
    this.root = this.submitButton.locator('..');
    this.eventTitle = this.root.getByRole('textbox', { name: 'Event title', exact: true });
    this.eventDateTime = this.root.getByRole('textbox').nth(1);
    this.venue = this.root.getByRole('textbox', { name: 'Venue (optional)', exact: true });
    this.details = this.root.getByRole('textbox', { name: 'Details for families (optional)', exact: true });
    this.invitationCard = this.root.getByRole('radiogroup', { name: 'Invitation card', exact: true });
  }

  /** Fills the event title, venue, and details. */
  async fill(title: string, venue: string, details: string): Promise<void> {
    await this.eventTitle.fill(title);
    await this.venue.fill(venue);
    await this.details.fill(details);
  }

  /** Chooses an invitation card. */
  async selectCard(name: string): Promise<void> {
    await this.invitationCard.getByRole('radio', { name, exact: true }).check();
  }

  /** Submits the create-group-event form. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
