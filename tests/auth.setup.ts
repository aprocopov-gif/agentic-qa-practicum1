import fs from 'node:fs';
import path from 'node:path';

import { test as setup, expect } from '@playwright/test';

import { LoginPage } from '../pages';
import { AUTH_FILE, ALT_AUTH_FILE } from '../support/auth.constants';
import { AppRoute } from '../test-data/routes';

const postLoginUrl = new RegExp(`${AppRoute.Dashboard.replace('/', '\\/')}(\\/|\\?|$)`);
const loginUrl = new RegExp(`${AppRoute.Login.replace('/', '\\/')}(\\/|\\?|$)`);

setup('authenticate main family', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillEmail(process.env.APP_USER_EMAIL!);
  await loginPage.fillPassword(process.env.APP_USER_PASSWORD!);
  await loginPage.submit();

  await expect(page).toHaveURL(postLoginUrl);
  await expect(page).not.toHaveURL(loginUrl);

  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
  await page.context().storageState({ path: AUTH_FILE });
});

setup('authenticate second family', async ({ page }) => {
  const altEmail = process.env.APP_ALT_USER_EMAIL;
  const altPassword = process.env.APP_ALT_USER_PASSWORD;
  setup.skip(
    !altEmail || !altPassword,
    'APP_ALT_USER_EMAIL and APP_ALT_USER_PASSWORD must be set for second-family auth',
  );

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillEmail(altEmail!);
  await loginPage.fillPassword(altPassword!);
  await loginPage.submit();

  await expect(page).toHaveURL(postLoginUrl);
  await expect(page).not.toHaveURL(loginUrl);

  fs.mkdirSync(path.dirname(ALT_AUTH_FILE), { recursive: true });
  await page.context().storageState({ path: ALT_AUTH_FILE });
});
