import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

type MyFixtures = {
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
});

test.beforeEach(async ({ page, request }) => {
  // Reset database
  await request.post('/api/test/reset-db');
  
  // Navigate to the application URL first
  await page.goto('/');
  // Then clear localStorage
  await page.evaluate(() => window.localStorage.clear());
});

export { expect } from '@playwright/test'; 