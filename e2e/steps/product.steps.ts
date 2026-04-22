import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am logged in and on the products page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');
    await page.goto('/products');
});


When('I click the add product button', async ({ page }) => {
    await page.getByTestId('add-product-button').click();
    await page.getByTestId('product-name-input').locator('input').fill('Test Product');
    await page.getByTestId('product-price-input').locator('input').fill('10.99');
    await page.getByTestId('product-category-input').locator('input').fill('Electronics');
    await page.getByRole('textbox', { name: 'Description' }).fill('A great product');
    await page.getByTestId('save-product-button').click();
});

Then('new product should be added to the list', async ({ page }) => {
    await expect(page).toHaveURL('/products');
    await expect(page.getByText('Test Product')).toBeVisible();
});

When('I click the add product button and then cancel', async ({ page }) => {
    await page.getByTestId('add-product-button').click();
    await page.getByTestId('product-name-input').locator('input').fill('Test Product');
    await page.getByTestId('product-price-input').locator('input').fill('10.99');
    await page.getByTestId('product-category-input').locator('input').fill('Electronics');
    await page.getByRole('textbox', { name: 'Description' }).fill('A great product');
    await page.getByTestId('cancel-product-button').click();
});

Then('the product should not be added to the list', async ({ page }) => {
    await expect(page).toHaveURL('/products');
    await expect(page.getByText('Test Product')).not.toBeVisible();
});

When('I submit the product form with valid data', async ({ page }) => {
  await page.getByTestId('add-product-button').click();
  await page.getByTestId('product-name-input').locator('input').fill('Test Product');
  await page.getByTestId('product-price-input').locator('input').fill('10.99');
  await page.getByTestId('product-category-input').locator('input').fill('Electronics');
  await page.getByRole('textbox', { name: 'Description' }).fill('A great product');
  await page.getByTestId('save-product-button').click();
});

Then('I should NOT see the form error alert', async ({ page }) => {
  await expect(page.getByTestId('form-error-alert')).toBeHidden();
});

