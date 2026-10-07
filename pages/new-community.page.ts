import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { CreateCommunityFormComponent } from './components/create-community-form.component';
import { HeaderComponent } from './components/header.component';

export class NewCommunityPage {
  readonly header: HeaderComponent;
  readonly createCommunityForm: CreateCommunityFormComponent;
  readonly title: Locator;
  readonly backLink: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.createCommunityForm = new CreateCommunityFormComponent(page);
    this.title = this.header.banner.getByText('Communities', { exact: true });
    this.backLink = page.getByRole('link', { name: '← Back to communities', exact: true });
  }

  /** Opens the create-group form. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.NewCommunity);
  }
}
