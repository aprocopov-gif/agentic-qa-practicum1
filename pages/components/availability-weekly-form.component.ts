import { type Locator, type Page } from '@playwright/test';

export class AvailabilityWeeklyFormComponent {
  readonly heading: Locator;
  readonly weekendAfternoonsButton: Locator;
  readonly addSlotButton: Locator;
  readonly day: Locator;
  readonly startTime: Locator;
  readonly endTime: Locator;
  readonly kid: Locator;
  readonly hosting: Locator;
  readonly notice: Locator;
  readonly removeButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Set your weekly free time', exact: true });
    this.weekendAfternoonsButton = page.getByRole('button', { name: 'Weekend afternoons', exact: true });
    this.addSlotButton = page.getByRole('button', { name: '+ Add slot', exact: true });
    this.day = page.getByRole('combobox', { name: 'Day', exact: true });
    this.startTime = page.getByRole('textbox', { name: 'Start time', exact: true });
    this.endTime = page.getByRole('textbox', { name: 'End time', exact: true });
    this.kid = page.getByRole('combobox', { name: 'Kid', exact: true });
    this.hosting = page.getByRole('combobox', { name: 'Hosting', exact: true });
    this.notice = page.getByRole('combobox', { name: 'Notice', exact: true });
    this.removeButton = page.getByRole('button', { name: 'remove', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Save availability', exact: true });
  }

  /** Applies the weekend-afternoons preset. */
  async applyWeekendAfternoons(): Promise<void> {
    await this.weekendAfternoonsButton.click();
  }

  /** Adds a weekly slot from the section header. */
  async addSlot(): Promise<void> {
    await this.addSlotButton.click();
  }

  /** Saves weekly availability. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
