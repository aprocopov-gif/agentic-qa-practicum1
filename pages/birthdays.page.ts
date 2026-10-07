import { type Locator, type Page } from '@playwright/test';
import { AppRoute, birthdayPartyRoute } from '../test-data/routes';
import { CreatePartyFormComponent } from './components/create-party-form.component';
import { HeaderComponent } from './components/header.component';

export class BirthdaysPage {
  readonly header: HeaderComponent;
  readonly createPartyForm: CreatePartyFormComponent;
  readonly title: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.createPartyForm = new CreatePartyFormComponent(page);
    this.title = this.header.banner.getByText('Birthdays', { exact: true });
  }

  /** Opens the birthdays page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Birthdays);
  }

  /** Opens a party detail page by id. */
  async openPartyById(partyId: string): Promise<void> {
    await this.page.goto(birthdayPartyRoute(partyId));
  }

  /** Opens a past party by its title. */
  async openParty(title: string): Promise<void> {
    await this.page.getByText(title, { exact: true }).locator('..').locator('..').getByRole('link', { name: 'View', exact: true }).click();
  }
}
