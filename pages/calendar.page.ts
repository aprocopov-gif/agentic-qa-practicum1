import { type Locator, type Page } from '@playwright/test';
import { AppRoute } from '../test-data/routes';
import { HeaderComponent } from './components/header.component';

export class CalendarPage {
  readonly header: HeaderComponent;
  readonly title: Locator;
  readonly familyCalendar: Locator;
  readonly thisWeek: Locator;
  readonly birthdaysThisMonth: Locator;
  readonly noPlansThisWeek: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = this.header.banner.getByText('Calendar', { exact: true });
    this.familyCalendar = page.getByText('Your family calendar', { exact: true });
    this.thisWeek = page.getByText('This week', { exact: true });
    this.birthdaysThisMonth = page.getByText('Birthdays this month');
    this.noPlansThisWeek = page.getByText('No plans in the next 7 days.', { exact: true });
  }

  /** Opens the calendar. */
  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Calendar);
  }
}
