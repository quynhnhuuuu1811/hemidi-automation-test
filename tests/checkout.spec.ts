import { test, expect } from '@playwright/test';

test('Standard user can purchase two products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Nhu');
  await page.locator('[data-test="lastName"]').fill('Nguyen');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});