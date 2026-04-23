import { Page, expect } from '@playwright/test';
import { Product } from '../types/types';

export async function login(page: Page) {
  await page.goto('/login');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password');
  await page.getByTestId('login-submit').click();

  await page.waitForURL('/');
}

export async function goToProducts(page: Page) {
  await page.goto('/products');
  await expect(page).toHaveURL('/products');
}

export async function openAddProductDialog(page: Page) {
  await page.getByTestId('add-product-button').click();
}

export async function fillProductForm(
  page: Page,
  product: {
    name: string;
    price: string;
    category: string;
    description: string;
  }
) {
  await page.getByTestId('product-name-input').locator('input').fill(product.name);
  await page.getByTestId('product-price-input').locator('input').fill(product.price);
  await page.getByTestId('product-category-input').locator('input').fill(product.category);
  await page.getByRole('textbox', { name: 'Description' }).fill(product.description);
}

export async function saveProduct(page: Page) {
  await page.getByTestId('save-product-button').click();
}

export async function cancelProduct(page: Page) {
  await page.getByTestId('cancel-product-button').click();
}

export async function waitForProductsApi(page: Page) {
  return await page.waitForResponse(
    response =>
      response.url().includes('/products') &&
      response.request().method() === 'GET'
  );
}

export const nameFieldIsInvalid = async (page: Page) => {
  const nameInput = page.getByTestId('product-name-input').locator('input');
  const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
  expect(isInvalid).toBe(true);
};

export const descriptionFieldIsInvalid = async (page: Page) => {
  const textarea = page.getByTestId('product-description-input').locator('textarea').first();
  const isInvalid = await textarea.evaluate((el: HTMLTextAreaElement) => !el.validity.valid);
  expect(isInvalid).toBe(true);
};

export function createTestProduct(overrides?: Partial<Product>): Product {
  return {
    name: `Test Product ${Date.now()}`,
    price: '10.99',
    category: 'Electronics',
    description: 'A great product',
    ...overrides, // allows customization per test
  };
}