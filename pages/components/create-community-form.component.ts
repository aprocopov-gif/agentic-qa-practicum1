import { type Locator, type Page } from '@playwright/test';

export class CreateCommunityFormComponent {
  readonly root: Locator;
  readonly groupName: Locator;
  readonly type: Locator;
  readonly description: Locator;
  readonly children: Locator;
  readonly submitButton: Locator;
  readonly cancelLink: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Create group', exact: true });
    this.root = this.submitButton.locator('..');
    this.groupName = page.getByRole('textbox', { name: 'Group name', exact: true });
    this.type = page.getByRole('combobox', { name: 'Type', exact: true });
    this.description = page.getByRole('textbox', { name: 'Description (optional)', exact: true });
    this.children = page.getByRole('group', { name: 'Which of your children are in this group?', exact: true });
    this.cancelLink = page.getByRole('link', { name: 'Cancel', exact: true });
  }

  /** Fills the group name, type, and description. */
  async fill(name: string, type: string, description: string): Promise<void> {
    await this.groupName.fill(name);
    await this.type.selectOption({ label: type });
    await this.description.fill(description);
  }

  /** Selects a child who is in this group. */
  async selectChild(name: string): Promise<void> {
    await this.children.getByRole('checkbox', { name, exact: true }).check();
  }

  /** Submits the create-community form. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Leaves the form without creating a group. */
  async cancel(): Promise<void> {
    await this.cancelLink.click();
  }
}
