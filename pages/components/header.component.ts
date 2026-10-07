import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly navigation: Locator;
  readonly banner: Locator;
  readonly brand: Locator;
  readonly mainSection: Locator;
  readonly planningSection: Locator;
  readonly accountSection: Locator;
  readonly dashboardLink: Locator;
  readonly calendarLink: Locator;
  readonly friendsLink: Locator;
  readonly communitiesLink: Locator;
  readonly availabilityLink: Locator;
  readonly playdatesLink: Locator;
  readonly birthdaysLink: Locator;
  readonly discoverButton: Locator;
  readonly profileLink: Locator;
  readonly adminLink: Locator;
  readonly goPremiumButton: Locator;
  readonly notificationsButton: Locator;
  readonly logOutButton: Locator;
  readonly status: Locator;

  constructor(page: Page) {
    this.navigation = page.getByRole('navigation');
    this.banner = page.getByRole('banner');
    this.brand = page.getByRole('complementary').getByText('BuddyTime', { exact: true });
    this.mainSection = this.navigation.getByText('Main', { exact: true });
    this.planningSection = this.navigation.getByText('Planning', { exact: true });
    this.accountSection = this.navigation.getByText('Account', { exact: true });
    this.dashboardLink = this.navigation.getByRole('link', { name: 'Dashboard', exact: true });
    this.calendarLink = this.navigation.getByRole('link', { name: 'Calendar', exact: true });
    this.friendsLink = this.navigation.getByRole('link', { name: 'Friends', exact: true });
    this.communitiesLink = this.navigation.getByRole('link', { name: 'Communities', exact: true });
    this.availabilityLink = this.navigation.getByRole('link', { name: 'Availability', exact: true });
    this.playdatesLink = this.navigation.getByRole('link', { name: 'Playdates', exact: true });
    this.birthdaysLink = this.navigation.getByRole('link', { name: 'Birthdays', exact: true });
    this.discoverButton = this.navigation.getByRole('button', { name: 'Discover', exact: true });
    this.profileLink = this.navigation.getByRole('link', { name: 'My Profile', exact: true });
    this.adminLink = this.navigation.getByRole('link', { name: 'Admin', exact: true });
    this.goPremiumButton = page.getByRole('complementary').getByRole('button', { name: 'Go Premium' });
    this.notificationsButton = this.banner.getByRole('button', { name: 'Notifications', exact: true });
    this.logOutButton = this.banner.getByRole('button', { name: 'Log out', exact: true });
    this.status = page.getByRole('status');
  }

  /** Opens Dashboard from the main navigation. */
  async openDashboard(): Promise<void> {
    await this.dashboardLink.click();
  }

  /** Opens Calendar from the main navigation. */
  async openCalendar(): Promise<void> {
    await this.calendarLink.click();
  }

  /** Opens Friends from the main navigation. */
  async openFriends(): Promise<void> {
    await this.friendsLink.click();
  }

  /** Opens Communities from the main navigation. */
  async openCommunities(): Promise<void> {
    await this.communitiesLink.click();
  }

  /** Opens Availability from the main navigation. */
  async openAvailability(): Promise<void> {
    await this.availabilityLink.click();
  }

  /** Opens Playdates from the main navigation. */
  async openPlaydates(): Promise<void> {
    await this.playdatesLink.click();
  }

  /** Opens Birthdays from the main navigation. */
  async openBirthdays(): Promise<void> {
    await this.birthdaysLink.click();
  }

  /** Opens My Profile from the main navigation. */
  async openProfile(): Promise<void> {
    await this.profileLink.click();
  }

  /** Opens Admin from the main navigation. */
  async openAdmin(): Promise<void> {
    await this.adminLink.click();
  }

  /** Activates Discover in the main navigation. */
  async openDiscover(): Promise<void> {
    await this.discoverButton.click();
  }

  /** Opens the premium offer from the sidebar. */
  async openPremium(): Promise<void> {
    await this.goPremiumButton.click();
  }

  /** Opens notifications from the header. */
  async openNotifications(): Promise<void> {
    await this.notificationsButton.click();
  }

  /** Signs out from the header. */
  async logOut(): Promise<void> {
    await this.logOutButton.click();
  }
}
