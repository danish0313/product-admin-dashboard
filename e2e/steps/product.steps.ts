import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';
import {
  login,
  goToProducts,
  openAddProductDialog,
  fillProductForm,
  saveProduct,
  cancelProduct,
  waitForProductsApi,
  createTestProduct,
  nameFieldIsInvalid,
  descriptionFieldIsInvalid,
} from '../helpers/productHelpers';
import { Product } from '../types/types';

const { Given, When, Then, Before } = createBdd();


let product: Product;

/**
 * Generate fresh data before each scenario
 */
Before(async () => {
  product = createTestProduct();
});


/**
 * ---------- BDD Steps ----------
 */

/**
 * Reusable precondition
 */
Given('I am logged in and on the products page', async ({ page }) => {
  await login(page);
  await goToProducts(page);
});

/**
 * Add product successfully
 */
When('I add a new product', async ({ page }) => {
  await openAddProductDialog(page);
  await fillProductForm(page, product);
  await saveProduct(page);
});

/**
 * Add product then cancel
 */
When('I start adding a product and cancel', async ({ page }) => {
  await openAddProductDialog(page);
  await fillProductForm(page, product);
  await cancelProduct(page);
});

/**
 * Validate GET /products API call
 */
When('the products API is requested', async ({ page }) => {
  const response = await waitForProductsApi(page);
  expect(response.status()).toBe(200);
});

/**
 * Click add product button
 */
When('I click the add product button', async ({ page }) => {
  await openAddProductDialog(page);
});

/**
 * Fill product details with specific values
 */
When('I fill in the product details with name {string}, price {string}, category {string} and description {string}', async ({ page }, name: string, price: string, category: string, description: string) => {
  await fillProductForm(page, { name, price, category, description });
});

/**
 * Click save product button
 */
When('I click the save product button', async ({ page }) => {
  await saveProduct(page);
});

/**
 * ---------- Assertions ----------
 */

Then('the new product should be visible in the list', async ({ page }) => {
  await expect(page.getByText(product.name)).toBeVisible();
});

Then('the product should not be added to the list', async ({ page }) => {
  await expect(page.getByText(product.name)).toHaveCount(0);
});

Then('I should not see the form error alert', async ({ page }) => {
  await expect(page.getByTestId('form-error-alert')).toHaveCount(0);
});

Then('I should remain on the products page', async ({ page }) => {
  await expect(page).toHaveURL('/products');
});

Then('the description field should be marked as required', async ({ page }) => {
  await descriptionFieldIsInvalid(page);
});

Then('the name field should be marked as required', async ({ page }) => {
  await nameFieldIsInvalid(page);
});

Then('the dialog should remain open', async ({ page }) => {
  await expect(page.getByRole('dialog')).toBeVisible();
});