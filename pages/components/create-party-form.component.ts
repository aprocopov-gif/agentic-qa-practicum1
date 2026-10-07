import { type Locator, type Page } from '@playwright/test';

export class CreatePartyFormComponent {
  readonly root: Locator;
  readonly whoseBirthday: Locator;
  readonly inviteChildren: Locator;
  readonly partyTitle: Locator;
  readonly partyDateTime: Locator;
  readonly venue: Locator;
  readonly guestDetails: Locator;
  readonly invitationCard: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Create party', exact: true });
    this.root = this.submitButton.locator('..');
    this.whoseBirthday = this.root.getByRole('combobox').filter({
      has: page.getByRole('option', { name: 'Whose birthday? (optional)', exact: true }),
    });
    this.inviteChildren = page.getByRole('group', { name: 'Invite children', exact: true });
    this.partyTitle = page.getByRole('textbox', { name: 'Party title', exact: true });
    this.partyDateTime = this.root.getByRole('textbox').nth(1);
    this.venue = page.getByRole('textbox', {
      name: 'Venue (e.g. our backyard, Chuck E. Cheese…)',
      exact: true,
    });
    this.guestDetails = page.getByRole('textbox', { name: 'Details for guests (optional)', exact: true });
    this.invitationCard = page.getByRole('radiogroup', { name: 'Invitation card', exact: true });
  }

  /** Fills the party title, venue, and guest details. */
  async fill(title: string, venue: string, details: string): Promise<void> {
    await this.partyTitle.fill(title);
    await this.venue.fill(venue);
    await this.guestDetails.fill(details);
  }

  /** Chooses whose birthday the party is for. */
  async selectBirthdayChild(name: string): Promise<void> {
    await this.whoseBirthday.selectOption({ label: name });
  }

  /** Checks an invitee in the invite-children group. */
  async selectInvitee(name: string): Promise<void> {
    await this.inviteChildren.getByRole('checkbox', { name }).check();
  }

  /** Chooses an invitation card. */
  async selectCard(name: string): Promise<void> {
    await this.invitationCard.getByRole('radio', { name, exact: true }).check();
  }

  /** Submits the create-party form. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
