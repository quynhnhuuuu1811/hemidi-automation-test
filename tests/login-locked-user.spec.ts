import { test, expect } from '@playwright/test';

test('Login fails for locked-out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});