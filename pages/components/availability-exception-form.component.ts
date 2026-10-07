import { type Locator, type Page } from '@playwright/test';

export class AvailabilityExceptionFormComponent {
  readonly root: Locator;
  readonly date: Locator;
  readonly type: Locator;
  readonly note: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Add exception', exact: true });
    this.root = this.submitButton.locator('..');
    this.date = this.root.getByRole('textbox').first();
    this.type = this.root.getByRole('combobox');
    this.note = this.root.getByRole('textbox', { name: 'Optional note', exact: true });
  }

  /** Fills the optional exception note. */
  async fillNote(note: string): Promise<void> {
    await this.note.fill(note);
  }

  /** Submits a one-off availability change. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
