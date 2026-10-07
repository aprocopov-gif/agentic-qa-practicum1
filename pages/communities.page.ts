import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { HeaderComponent } from './components/header.component';

export class CommunitiesPage {
  readonly header: HeaderComponent;
  readonly title: Locator;
  readonly heading: Locator;
  readonly createGroupLink: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = this.header.banner.getByText('Communities', { exact: true });
    this.heading = page.getByRole('heading', { name: 'Your communities', exact: true });
    this.createGroupLink = page.getByRole('link', { name: '+ Create group', exact: true });
  }

  /** Opens the communities page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Communities);
  }

  /** Opens the create-group form. */
  async openCreateGroup(): Promise<void> {
    await this.createGroupLink.click();
  }

  /** Opens the community whose link name includes this text. */
  async openCommunity(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }
}
