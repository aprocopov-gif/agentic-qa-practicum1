import { type Locator, type Page } from '@playwright/test';

export class FamilyDetailsFormComponent {
  readonly root: Locator;
  readonly familyName: Locator;
  readonly hostAddress: Locator;
  readonly addressVisibility: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Save family details', exact: true });
    this.root = this.submitButton.locator('..');
    this.familyName = page.getByRole('textbox', { name: 'Family name', exact: true });
    this.hostAddress = page.getByRole('textbox', { name: 'Host address or meeting note', exact: true });
    this.addressVisibility = this.root.getByRole('combobox').filter({
      has: page.getByRole('option', { name: 'Keep hidden', exact: true }),
    });
  }

  /** Fills family name and host note. */
  async fill(familyName: string, hostAddress: string): Promise<void> {
    await this.familyName.fill(familyName);
    await this.hostAddress.fill(hostAddress);
  }

  /** Chooses who can see the host address. */
  async selectAddressVisibility(option: string): Promise<void> {
    await this.addressVisibility.selectOption({ label: option });
  }

  /** Saves family details. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
