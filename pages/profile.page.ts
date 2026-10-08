import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { AvatarPickerComponent } from './components/avatar-picker.component';
import { DeleteAccountComponent } from './components/delete-account.component';
import { FamilyDetailsFormComponent } from './components/family-details-form.component';
import { HeaderComponent } from './components/header.component';
import { ProfileDetailsFormComponent } from './components/profile-details-form.component';

export class ProfilePage {
  readonly header: HeaderComponent;
  readonly profileDetailsForm: ProfileDetailsFormComponent;
  readonly familyDetailsForm: FamilyDetailsFormComponent;
  readonly avatarPicker: AvatarPickerComponent;
  readonly deleteAccount: DeleteAccountComponent;
  readonly title: Locator;
  readonly myAvailabilityButton: Locator;
  readonly privacyAndSafetyButton: Locator;
  readonly notificationSettingsButton: Locator;
  readonly calendarSyncButton: Locator;
  readonly logOutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly privacyLink: Locator;
  readonly termsLink: Locator;
  readonly calendarSyncToast: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.profileDetailsForm = new ProfileDetailsFormComponent(page);
    this.familyDetailsForm = new FamilyDetailsFormComponent(page);
    this.avatarPicker = new AvatarPickerComponent(page);
    this.deleteAccount = new DeleteAccountComponent(page);
    this.title = this.header.banner.getByText('My Profile', { exact: true });
    this.myAvailabilityButton = page.getByRole('button', { name: 'My Availability Weekly slots', exact: true });
    this.privacyAndSafetyButton = page.getByRole('button', {
      name: 'Privacy & Safety Private mode · circle only',
      exact: true,
    });
    this.notificationSettingsButton = page.getByRole('button', { name: /^Notifications / });
    this.calendarSyncButton = page.getByRole('button', {
      name: 'Calendar Sync Add-to-calendar links soon',
      exact: true,
    });
    this.logOutButton = page
      .getByText('Danger zone', { exact: true })
      .locator('..')
      .locator('..')
      .getByRole('button', { name: 'Log out', exact: true });
    this.deleteAccountButton = page.getByRole('button', { name: 'Delete account…', exact: true });
    this.privacyLink = page.getByRole('link', { name: 'Privacy Policy', exact: true });
    this.termsLink = page.getByRole('link', { name: 'Terms of Service', exact: true });
    this.calendarSyncToast = page.getByText('Calendar links ship with playdates 🗓️', { exact: true });
  }

  /** Opens Calendar Sync from profile settings. */
  async openCalendarSync(): Promise<void> {
    await this.calendarSyncButton.click();
  }

  /** Opens My Profile. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Profile);
  }

  /** Opens the avatar picker for the child card that shows this label. */
  async openChangeAvatar(childLabel: string): Promise<void> {
    await this.page
      .getByText(childLabel, { exact: true })
      .locator('..')
      .locator('..')
      .getByRole('button', { name: 'Change avatar', exact: true })
      .click();
  }

  /** Opens the delete-account confirmation. */
  async openDeleteAccount(): Promise<void> {
    await this.deleteAccountButton.click();
  }

  /** Keeps the account and closes the confirmation. */
  async cancelDeleteAccount(): Promise<void> {
    await this.deleteAccount.cancel();
  }

  /** Signs out from the profile page. */
  async logOut(): Promise<void> {
    await this.logOutButton.click();
  }
}
