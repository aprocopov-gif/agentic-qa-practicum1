import { type Browser } from '@playwright/test';

import { test, expect } from '../fixtures/cleanup.fixture';
import { DashboardPage } from '../pages/dashboard.page';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { FriendsPage } from '../pages/friends.page';
import { LandingPage } from '../pages/landing.page';
import { LoginPage } from '../pages/login.page';
import { AUTH_FILE } from '../support/auth.constants';
import { validFamilyACredentials } from '../test-data/factories/login.factory';
import { invalidLogin, unregisteredLoginEmail } from '../test-data/invalid-login';
import { AppRoute } from '../test-data/routes';

const emptyStorageState = { cookies: [] as [], origins: [] as [] };

const dashboardUrl = new RegExp(`${AppRoute.Dashboard.replace('/', '\\/')}(\\/|\\?|$)`);
const loginUrl = new RegExp(`${AppRoute.Login.replace('/', '\\/')}(\\/|\\?|$)`);
const friendsUrl = new RegExp(`${AppRoute.Friends.replace('/', '\\/')}(\\/|\\?|$)`);

async function signInFamilyA(browser: Browser): Promise<{
  context: Awaited<ReturnType<Browser['newContext']>>;
  page: Awaited<ReturnType<Awaited<ReturnType<Browser['newContext']>>['newPage']>>;
}> {
  const context = await browser.newContext({ storageState: emptyStorageState });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const { email, password } = validFamilyACredentials();
  await loginPage.goto();
  await loginPage.logIn(email, password);
  await expect(page).toHaveURL(dashboardUrl);
  return { context, page };
}

test.describe('AQPBT-1 log in (logged out)', () => {
  test.use({ storageState: emptyStorageState });

  test('successful log-in lands on Dashboard with signed-in shell @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const { email, password } = validFamilyACredentials();

    await loginPage.goto();
    await loginPage.logIn(email, password);

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page).not.toHaveURL(loginUrl);
    await expect(dashboard.title).toBeVisible();
    await expect(dashboard.header.logOutButton).toBeVisible();
  });

  test('log-in with next returns to Friends @sanity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const friends = new FriendsPage(page);
    const { email, password } = validFamilyACredentials();

    await loginPage.gotoWithReturnPath(AppRoute.Friends);
    await loginPage.logIn(email, password);

    await expect(page).toHaveURL(friendsUrl);
    await expect(friends.title).toBeVisible();
  });

  test('marketing Log in opens the log-in screen @regression', async ({ page }) => {
    const landing = new LandingPage(page);
    const loginPage = new LoginPage(page);

    await landing.goto();
    await landing.openLogIn();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.heading).toBeVisible();
  });

  test('forgot password exit path returns to log-in without sending reset @e2e', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPassword = new ForgotPasswordPage(page);

    await loginPage.goto();
    await loginPage.openForgotPassword();

    await expect(page).toHaveURL(new RegExp(`${AppRoute.ForgotPassword.replace('/', '\\/')}(\\/|\\?|$)`));
    await expect(forgotPassword.heading).toBeVisible();

    await forgotPassword.cancel();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.heading).toBeVisible();
    await expect(forgotPassword.sendResetLinkButton).not.toBeVisible();
  });

  test('incorrect password shows inline auth error @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { email } = validFamilyACredentials();

    await loginPage.goto();
    await loginPage.logIn(email, invalidLogin.wrongPassword);

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  });

  test('unregistered email shows the same inline auth error @api', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.logIn(unregisteredLoginEmail(), invalidLogin.wrongPassword);

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalidLogin.invalidCredentialsMessage);
  });

  test('empty email and password do not show auth failure message @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submit();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.invalidCredentialsMessage).toHaveCount(0);
  });

  test('unauthenticated deep link to Dashboard redirects to log-in @sanity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.goto();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.logInButton).toBeVisible();
  });

  test('sign up link preserves next when arriving from login with return URL @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoWithReturnPath(AppRoute.Friends);

    await expect(await loginPage.signUpHref()).toContain('next=%2Ffriends');
  });
});

test('log out from the signed-in banner returns to the log-in form @sanity', async ({ browser }) => {
  const { context, page } = await signInFamilyA(browser);
  try {
    const dashboard = new DashboardPage(page);
    const loginPage = new LoginPage(page);

    await expect(dashboard.title).toBeVisible();
    await dashboard.header.logOut();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.logInButton).toBeVisible();
  } finally {
    await context.close();
  }
});

test('already signed in user still sees the log-in form on /login @e2e', async ({ browser }) => {
  const signedIn = await browser.newContext({ storageState: AUTH_FILE });
  const page = await signedIn.newPage();
  try {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(page).toHaveURL(loginUrl);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.logInButton).toBeVisible();
  } finally {
    await signedIn.close();
  }
});
