import { type Locator, type Page } from '@playwright/test';
import { birthdayPartyRoute } from '../test-data/routes';
import { GuestLinkPanelComponent } from './components/guest-link-panel.component';
import { HeaderComponent } from './components/header.component';
import { InviteByEmailFormComponent } from './components/invite-by-email-form.component';

export class BirthdayPartyPage {
  readonly header: HeaderComponent;
  readonly guestLinkPanel: GuestLinkPanelComponent;
  readonly inviteByEmailForm: InviteByEmailFormComponent;
  readonly title: Locator;
  readonly addToCalendarLink: Locator;
  readonly rsvpsSummary: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.guestLinkPanel = new GuestLinkPanelComponent(page);
    this.inviteByEmailForm = new InviteByEmailFormComponent(page);
    this.title = this.header.banner.getByText('Birthdays', { exact: true });
    this.addToCalendarLink = page.getByRole('link', { name: 'Add to my calendar', exact: true });
    this.rsvpsSummary = page.getByText('RSVPs', { exact: true });
  }

  /** Opens a birthday party detail page. */
  async goto(partyId: string): Promise<void> {
    await this.page.goto(birthdayPartyRoute(partyId));
  }
}
