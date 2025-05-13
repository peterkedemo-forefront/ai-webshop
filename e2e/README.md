# E2E Testing (Playwright)

## Overview
This workspace contains end-to-end (E2E) tests for the webshop, using Playwright. The goal is to ensure critical user flows work as expected in a production-like environment, with robust test isolation and maintainable test code.

## How to Build and Run E2E Tests

1. **Build the frontend and backend:**
   ```sh
   npm run build:all
   ```
2. **Run all E2E tests:**
   ```sh
   npm run test:e2e:full
   ```
   - This will build the app, start the backend (serving the built frontend), and run all Playwright tests serially for full isolation.

## Selector Policy
- **Use only ARIA roles and accessible labels for selectors.**
- Do **not** use ids, class names, or test ids in selectors.
- If you encounter strict mode violations or multiple matches, use a more specific ARIA-based selector (e.g., unique role/name combination).

## Writing New Tests
- Use the provided page objects in `src/pages/` for all interactions.
- For product-related actions, use the `ProductCard` pattern:
  ```ts
  const card = homePage.getProductCard('Stylish T-shirt');
  await card.assertVisible();
  await card.clickAddToCart();
  await card.clickDetails();
  ```
- Add new methods to page objects as needed for new flows.

## Page Object Conventions
- All locator logic in page objects (such as `HomePage` and `ProductCard`) should be encapsulated in private getter methods.
- Public methods should use these private getters instead of directly calling Playwright's locator methods.
- This pattern improves maintainability and encapsulation, making it easier to update selectors in one place and keep test code clean.
- **All public async methods in page objects should be wrapped in [`test.step`](https://playwright.dev/docs/test-annotations#teststep) for improved reporting and structure.** This makes test output more readable and helps with debugging.

**Example:**
```ts
import { test, expect } from '@playwright/test';
class ProductCard {
  // ...
  private get addToCartButton() {
    return this.region.getByRole('button', { name: `Add ${this.name} to cart` });
  }
  async clickAddToCart() {
    await test.step(`Click add to cart for product '${this.name}'`, async () => {
      await this.addToCartButton.click();
    });
  }
}
```

## Test Isolation and DB Reset
- The backend exposes a test-only endpoint (`/api/test/reset-db`) that resets and seeds the database before each test.
- This ensures every test starts with a known, clean state and is fully isolated from others.
