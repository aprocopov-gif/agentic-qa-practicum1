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

const INTERESTS = ['+ LEGO', '+ Minecraft', '+ Soccer', '+ Art', '+ Reading', '+ Dance', '+ Hockey', '+ Crafts'] as const;

export class AddChildFormComponent {
  readonly root: Locator;
  readonly firstName: Locator;
  readonly birthYear: Locator;
  readonly birthMonth: Locator;
  readonly interests: Locator;
  readonly gender: Locator;
  readonly avatars: Readonly<Record<(typeof AVATARS)[number], Locator>>;
  readonly interestChips: Readonly<Record<(typeof INTERESTS)[number], Locator>>;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Add child', exact: true });
    this.root = this.submitButton.locator('..');
    this.firstName = this.root.getByRole('textbox', { name: "Child's first name", exact: true });
    this.birthYear = this.root.getByRole('spinbutton', { name: 'Birth year', exact: true });
    this.birthMonth = this.root.getByRole('spinbutton', { name: 'Month', exact: true });
    this.interests = this.root.getByRole('textbox', { name: 'Interests (comma-separated)', exact: true });
    this.gender = this.root.getByRole('combobox', { name: 'Gender', exact: true });
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
    this.interestChips = {
      '+ LEGO': this.root.getByRole('button', { name: '+ LEGO', exact: true }),
      '+ Minecraft': this.root.getByRole('button', { name: '+ Minecraft', exact: true }),
      '+ Soccer': this.root.getByRole('button', { name: '+ Soccer', exact: true }),
      '+ Art': this.root.getByRole('button', { name: '+ Art', exact: true }),
      '+ Reading': this.root.getByRole('button', { name: '+ Reading', exact: true }),
      '+ Dance': this.root.getByRole('button', { name: '+ Dance', exact: true }),
      '+ Hockey': this.root.getByRole('button', { name: '+ Hockey', exact: true }),
      '+ Crafts': this.root.getByRole('button', { name: '+ Crafts', exact: true }),
    };
  }

  /** Fills the add-child fields without submitting. */
  async fill(name: string, birthYear: string, month: string, interests: string): Promise<void> {
    await this.firstName.fill(name);
    await this.birthYear.fill(birthYear);
    await this.birthMonth.fill(month);
    await this.interests.fill(interests);
  }

  /** Chooses a gender option. */
  async selectGender(option: string): Promise<void> {
    await this.gender.selectOption({ label: option });
  }

  /** Chooses an avatar button. */
  async selectAvatar(name: (typeof AVATARS)[number]): Promise<void> {
    await this.avatars[name].click();
  }

  /** Adds an interest chip. */
  async addInterest(name: (typeof INTERESTS)[number]): Promise<void> {
    await this.interestChips[name].click();
  }

  /** Submits the add-child form. */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
