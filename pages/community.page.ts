import { type Locator, type Page } from '@playwright/test';
import { communityRoute } from '../test-data/routes';
import { CreateGroupEventFormComponent } from './components/create-group-event-form.component';
import { HeaderComponent } from './components/header.component';
import { InviteLinkPanelComponent } from './components/invite-link-panel.component';
import { PostAnnouncementFormComponent } from './components/post-announcement-form.component';

export class CommunityPage {
  readonly header: HeaderComponent;
  readonly inviteLinkPanel: InviteLinkPanelComponent;
  readonly createGroupEventForm: CreateGroupEventFormComponent;
  readonly postAnnouncementForm: PostAnnouncementFormComponent;
  readonly title: Locator;
  readonly communityName: Locator;
  readonly backLink: Locator;
  readonly inviteFamiliesButton: Locator;
  readonly membersTab: Locator;
  readonly eventsTab: Locator;
  readonly announcementsTab: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.inviteLinkPanel = new InviteLinkPanelComponent(page);
    this.createGroupEventForm = new CreateGroupEventFormComponent(page);
    this.postAnnouncementForm = new PostAnnouncementFormComponent(page);
    this.title = this.header.banner.getByText('Communities', { exact: true });
    this.communityName = page.getByRole('heading', { level: 2 });
    this.backLink = page.getByRole('link', { name: '← All communities', exact: true });
    this.inviteFamiliesButton = page.getByRole('button', { name: 'Invite families', exact: true });
    this.membersTab = page.getByRole('tab', { name: 'Members', exact: true });
    this.eventsTab = page.getByRole('tab', { name: 'Events', exact: true });
    this.announcementsTab = page.getByRole('tab', { name: 'Announcements', exact: true });
  }

  /** Opens a community detail page. */
  async goto(communityId: string): Promise<void> {
    await this.page.goto(communityRoute(communityId));
  }

  /** Opens the Members tab. */
  async openMembers(): Promise<void> {
    await this.membersTab.click();
  }

  /** Opens the Events tab. */
  async openEvents(): Promise<void> {
    await this.eventsTab.click();
  }

  /** Opens the Announcements tab. */
  async openAnnouncements(): Promise<void> {
    await this.announcementsTab.click();
  }

  /** Copies the group invite link from the header action. */
  async inviteFamilies(): Promise<void> {
    await this.inviteFamiliesButton.click();
  }
}
