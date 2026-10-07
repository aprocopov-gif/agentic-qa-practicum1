import { type Locator, type Page } from '@playwright/test';

const AVATARS = [
  'Fox',
  'Dino',
  'Robot',
  'Cat',
  'Penguin',
  'Unicorn',
  'Bear',
  'Bunny',
  'Frog',
  'Owl',
  'Lion',
  'Panda',
  'Whale',
  'Ladybug',
  'Rocket',
  'Ball',
] as const;

export class AvatarPickerComponent {
  readonly root: Locator;
  readonly avatars: Readonly<Record<(typeof AVATARS)[number], Locator>>;
  readonly gender: Locator;
  readonly doneButton: Locator;

  constructor(page: Page) {
    this.doneButton = page.getByRole('button', { name: 'done', exact: true });
    this.root = this.doneButton.locator('..').locator('..');
    this.gender = this.root.getByRole('combobox');
    this.avatars = {
      Fox: this.root.getByRole('button', { name: 'Fox', exact: true }),
      Dino: this.root.getByRole('button', { name: 'Dino', exact: true }),
      Robot: this.root.getByRole('button', { name: 'Robot', exact: true }),
      Cat: this.root.getByRole('button', { name: 'Cat', exact: true }),
      Penguin: this.root.getByRole('button', { name: 'Penguin', exact: true }),
      Unicorn: this.root.getByRole('button', { name: 'Unicorn', exact: true }),
      Bear: this.root.getByRole('button', { name: 'Bear', exact: true }),
      Bunny: this.root.getByRole('button', { name: 'Bunny', exact: true }),
      Frog: this.root.getByRole('button', { name: 'Frog', exact: true }),
      Owl: this.root.getByRole('button', { name: 'Owl', exact: true }),
      Lion: this.root.getByRole('button', { name: 'Lion', exact: true }),
      Panda: this.root.getByRole('button', { name: 'Panda', exact: true }),
      Whale: this.root.getByRole('button', { name: 'Whale', exact: true }),
      Ladybug: this.root.getByRole('button', { name: 'Ladybug', exact: true }),
      Rocket: this.root.getByRole('button', { name: 'Rocket', exact: true }),
      Ball: this.root.getByRole('button', { name: 'Ball', exact: true }),
    };
  }

  /** Chooses an avatar in the open picker. */
  async selectAvatar(name: (typeof AVATARS)[number]): Promise<void> {
    await this.avatars[name].click();
  }

  /** Chooses a gender option in the open picker. */
  async selectGender(option: string): Promise<void> {
    await this.gender.selectOption({ label: option });
  }

  /** Closes the picker with done. */
  async done(): Promise<void> {
    await this.doneButton.click();
  }
}
