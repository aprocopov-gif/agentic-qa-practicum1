import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { AddChildFormComponent } from './components/add-child-form.component';
import { AvatarPickerComponent } from './components/avatar-picker.component';
import { CircleInvitePanelComponent } from './components/circle-invite-panel.component';
import { CoParentInviteComponent } from './components/co-parent-invite.component';
import { HeaderComponent } from './components/header.component';

export class DashboardPage {
  readonly header: HeaderComponent;
  readonly addChildForm: AddChildFormComponent;
  readonly circleInvitePanel: CircleInvitePanelComponent;
  readonly coParentInvite: CoParentInviteComponent;
  readonly avatarPicker: AvatarPickerComponent;
  readonly title: Locator;
  readonly greeting: Locator;
  readonly findPlaydateLink: Locator;
  readonly viewAllPlaydatesLink: Locator;
  readonly inviteFamilyButton: Locator;
  readonly inviteCoParentButton: Locator;
  readonly setUpAvailabilityLink: Locator;
  readonly seeAllFriendsLink: Locator;
  readonly enablePushRemindersButton: Locator;
  readonly installAppButton: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.addChildForm = new AddChildFormComponent(page);
    this.circleInvitePanel = new CircleInvitePanelComponent(page);
    this.coParentInvite = new CoParentInviteComponent(page);
    this.avatarPicker = new AvatarPickerComponent(page);
    this.title = this.header.banner.getByText('Dashboard', { exact: true });
    this.greeting = page.getByRole('heading', { level: 2 });
    this.findPlaydateLink = page.getByRole('link', { name: 'Find a Playdate', exact: true });
    this.viewAllPlaydatesLink = page.getByRole('link', { name: 'View all', exact: true });
    this.inviteFamilyButton = page.getByRole('button', { name: '+ Invite a family', exact: true });
    this.inviteCoParentButton = page.getByRole('button', { name: 'Invite co-parent', exact: true });
    this.setUpAvailabilityLink = page.getByRole('link', { name: 'Set up', exact: true });
    this.seeAllFriendsLink = page.getByRole('link', { name: 'See all →', exact: true });
    this.enablePushRemindersButton = page.getByRole('button', { name: 'Enable push reminders', exact: true });
    this.installAppButton = page.getByRole('button', { name: 'Install app', exact: true });
  }

  /** Opens the dashboard. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Dashboard);
  }

  /** Opens the avatar picker for the child card that shows this label. */
  async openChangeAvatar(childLabel: string): Promise<void> {
    await this.childCard(childLabel).getByRole('button', { name: 'Change avatar', exact: true }).click();
  }

  /** Opens the circle invite panel. */
  async openCircleInvite(): Promise<void> {
    await this.inviteFamilyButton.click();
  }

  /** Opens the co-parent invite panel. */
  async openCoParentInvite(): Promise<void> {
    await this.inviteCoParentButton.click();
  }

  /** Opens the install-app control. */
  async openInstallApp(): Promise<void> {
    await this.installAppButton.click();
  }

  private childCard(childLabel: string): Locator {
    return this.page.getByText(childLabel, { exact: true }).locator('..').locator('..');
  }
}
