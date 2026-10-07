import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { AvailabilityExceptionFormComponent } from './components/availability-exception-form.component';
import { AvailabilityWeeklyFormComponent } from './components/availability-weekly-form.component';
import { HeaderComponent } from './components/header.component';

export class AvailabilityPage {
  readonly header: HeaderComponent;
  readonly weeklyForm: AvailabilityWeeklyFormComponent;
  readonly exceptionForm: AvailabilityExceptionFormComponent;
  readonly title: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.weeklyForm = new AvailabilityWeeklyFormComponent(page);
    this.exceptionForm = new AvailabilityExceptionFormComponent(page);
    this.title = this.header.banner.getByText('Availability', { exact: true });
  }

  /** Opens the availability page. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Availability);
  }
}
