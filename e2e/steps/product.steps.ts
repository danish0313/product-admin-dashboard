import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

/**
 * Logs in with valid credentials and navigates to the products page.
 * This step acts as a reusable precondition for all product-related scenarios.
 */
Given('I am logged in and on the products page', async ({ page }) => {
  await page.goto('/login');

  // Fill login form
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password');

  // Submit login
  await page.getByTestId('login-submit').click();

  // Ensure login completed before navigating
  await page.waitForURL('/');

  // Navigate to products page
  await page.goto('/products');
});

/**
 * Opens the add product dialog, fills all required fields, and submits the form.
 */
When('I click the add product button', async ({ page }) => {
  await page.getByTestId('add-product-button').click();

  // Fill product form fields
  await page.getByTestId('product-name-input').locator('input').fill('Test Product');
  await page.getByTestId('product-price-input').locator('input').fill('10.99');
  await page.getByTestId('product-category-input').locator('input').fill('Electronics');
  await page.getByRole('textbox', { name: 'Description' }).fill('A great product');

  // Submit form
  await page.getByTestId('save-product-button').click();
});

/**
 * Verifies that the newly created product appears in the products list.
 */
Then('new product should be added to the list', async ({ page }) => {
  await expect(page).toHaveURL('/products');

  // Assert that the new product is visible in the UI
  await expect(page.getByText('Test Product')).toBeVisible();
});

/**
 * Opens the add product dialog, fills the form, but cancels instead of saving.
 */
When('I click the add product button and then cancel', async ({ page }) => {
  await page.getByTestId('add-product-button').click();

  // Fill product form fields
  await page.getByTestId('product-name-input').locator('input').fill('Test Product');
  await page.getByTestId('product-price-input').locator('input').fill('10.99');
  await page.getByTestId('product-category-input').locator('input').fill('Electronics');
  await page.getByRole('textbox', { name: 'Description' }).fill('A great product');

  // Cancel instead of saving
  await page.getByTestId('cancel-product-button').click();
});

/**
 * Ensures that cancelling the form does not create a new product.
 */
Then('the product should not be added to the list', async ({ page }) => {
  await expect(page).toHaveURL('/products');

  // Assert product is NOT present
  await expect(page.getByText('Test Product')).not.toBeVisible();
});

/**
 * Submits the product form with valid data.
 * This is used to verify successful submission behavior (no validation errors).
 */
When('I submit the product form with valid data', async ({ page }) => {
  await page.getByTestId('add-product-button').click();

  // Fill all required fields correctly
  await page.getByTestId('product-name-input').locator('input').fill('Test Product');
  await page.getByTestId('product-price-input').locator('input').fill('10.99');
  await page.getByTestId('product-category-input').locator('input').fill('Electronics');
  await page.getByRole('textbox', { name: 'Description' }).fill('A great product');

  // Submit form
  await page.getByTestId('save-product-button').click();
});

/**
 * Verifies that no validation error is shown when the form is valid.
 */
Then('I should NOT see the form error alert', async ({ page }) => {
  // Using toHaveCount(0) is usually more reliable than toBeHidden()
  await expect(page.getByTestId('form-error-alert')).toHaveCount(0);
});
