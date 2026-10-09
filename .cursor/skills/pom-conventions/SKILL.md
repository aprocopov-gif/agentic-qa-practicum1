---
name: pom-conventions
description: Page Object Model conventions for Playwright tests in this project. Apply whenever generating, refactoring, or reviewing any Playwright test that interacts with the app under test (BuddyTime) — even if the user doesn't say "POM". Tests should never contain inline locators.
paths: "tests/**, pages/**"
---

# POM conventions

## Steps

- One class per page or distinct component; locators as readonly properties set in the constructor (`getByRole`, `getByLabel`, `getByText` — never CSS); methods for user actions that do not assert; no `expect()` in `pages/`; compose components inside pages; specs import POMs and instantiate them with `new XxxPage(page)`.

## BuddyTime page inventory

Routes come from each page’s `goto` (and helpers) plus `test-data/routes.ts`. Components live under `pages/components/` and are composed on the page classes listed in Notes — not separate routes.

| Route | Page object | Notes |
| --- | --- | --- |
| `/` | `LandingPage` | Public marketing |
| `/login` | `LoginPage` | `gotoWithReturnPath(returnPath)` for `?next=` |
| `/signup` | `SignUpPage` | |
| `/forgot-password` | `ForgotPasswordPage` | |
| `/privacy` | `PrivacyPage` | |
| `/terms` | `TermsPage` | |
| `/app` | `DashboardPage` | `HeaderComponent`, `AddChildFormComponent`, `AvatarPickerComponent`, `CircleInvitePanelComponent`, `CoParentInviteComponent` |
| `/calendar` | `CalendarPage` | `HeaderComponent` |
| `/friends` | `FriendsPage` | `HeaderComponent`, `FriendManageComponent`, `CircleInvitePanelComponent` |
| `/communities` | `CommunitiesPage` | `HeaderComponent` |
| `/communities/new` | `NewCommunityPage` | `CreateCommunityFormComponent` |
| `/communities/{communityId}` | `CommunityPage` | `communityRoute(communityId)`; `InviteLinkPanelComponent`, `CreateGroupEventFormComponent`, `PostAnnouncementFormComponent` |
| `/availability` | `AvailabilityPage` | `AvailabilityWeeklyFormComponent`, `AvailabilityExceptionFormComponent` |
| `/playdates` | `PlaydatesPage` | `ProposePlaydateFormComponent`; row helpers by accessible name |
| `/playdates/new` | `PlaydatesPage` | `gotoNew()` |
| `/birthdays` | `BirthdaysPage` | `CreatePartyFormComponent`; `openPartyById(partyId)` → party detail |
| `/birthdays/{partyId}` | `BirthdayPartyPage` | `birthdayPartyRoute(partyId)`; `GuestLinkPanelComponent`, `InviteByEmailFormComponent` |
| `/profile` | `ProfilePage` | `ProfileDetailsFormComponent`, `FamilyDetailsFormComponent`, `DeleteAccountComponent`, `AvatarPickerComponent` |
| `/admin` | `AdminPage` | `HeaderComponent` |
| `/e/{token}` | `GuestRsvpPage` | `guestRsvpRoute(token)`; public RSVP |
| `/join/{token}` | `CoParentJoinPage` | `coParentJoinRoute(token)` |

## Locator rules

- Scope dialog locators to the dialog; use `{ exact: true }` where labels share a prefix; act on rows and cards by accessible name; never hardcode `APP_URL` (pages use relative paths; Playwright's baseURL comes from `APP_URL`); shared parts such as the header are components a page holds — never a base class it extends; two-family flows use one page object instance per context.

## Known app issues

add a row only when the instructor confirms a defect; mark the test with `test.fail(true, '<AQPBT bug key>: <reason>')`.

| Bug key | Symptom | Workaround in tests |
| --- | --- | --- |
| | | |

## Output

Page objects in `pages/`; specs in `tests/` that import them.

### Example POM (`pages/login.page.ts`)

```typescript
export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly logInButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', { name: 'Email', exact: true });
    this.password = page.getByRole('textbox', { name: 'Password', exact: true });
    this.logInButton = page.getByRole('button', { name: 'Log in', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(AppRoute.Login);
  }

  async logIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.logInButton.click();
  }
}
```

### Example spec (`tests/aqpbt-1-login.spec.ts`)

```typescript
test('successful log-in lands on Dashboard with signed-in shell @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const { email, password } = validFamilyACredentials();

  await loginPage.goto();
  await loginPage.logIn(email, password);

  await expect(page).toHaveURL(dashboardUrl);
  await expect(dashboard.title).toBeVisible();
});
```
