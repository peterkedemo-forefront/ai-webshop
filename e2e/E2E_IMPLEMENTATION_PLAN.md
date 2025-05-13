# Step-by-Step E2E Implementation Guide for Playwright (Serial, Reliable Setup)

---

## 1. Create E2E Workspace Structure

- In the root of your repo, create an `e2e/` directory with the following structure:

```
/e2e
  /src
    /pages
      HomePage.ts
      ProductPage.ts
      CartPage.ts
      CheckoutPage.ts
    fixtures.ts
    product-list.spec.ts
    product-details.spec.ts
    cart-add.spec.ts
    cart-remove.spec.ts
    checkout.spec.ts
  playwright.config.ts
  README.md
  package.json
```

---

## 2. Install Playwright in the E2E Workspace

From the root, run:
```sh
npm install --workspace e2e @playwright/test --save-dev
npx playwright install --with-deps
```
Verify that `@playwright/test` appears in `e2e/package.json`.

---

## 3. Configure Playwright for Serial Execution

Create or update `e2e/playwright.config.ts` with the following content:
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  workers: 1, // Run tests serially for full isolation
  webServer: {
    command: 'PORT=4000 NODE_ENV=test npm run start:test --workspace=server',
    url: 'http://localhost:4000',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: 'http://localhost:4000',
  },
});
```

---

## 4. Add Build and Test Scripts

In the root `package.json`, add:
```json
"scripts": {
  "build:all": "npm run build --workspace=client && npm run build --workspace=server",
  "test:e2e:full": "npm run build:all && npm run test:e2e --workspace=e2e"
}
```
In `server/package.json`, add:
```json
"scripts": {
  "start:test": "NODE_ENV=test node dist/index.js"
}
```
In `e2e/package.json`, add:
```json
"scripts": {
  "test:e2e": "playwright test"
}
```

---

## 5. Update Backend to Serve Built Frontend

In your Express app (e.g., `server/src/app.ts` or `server/src/index.ts`), after your API routes, add:
```ts
import path from 'path';

const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
```
Build the frontend and backend, then start the backend. Visit `http://localhost:4000` to verify the frontend is served.

---

## 6. Add Test-Only DB Reset Endpoint to Backend

In your Express app, add (before the catch-all route):
```ts
if (process.env.NODE_ENV === 'test') {
  app.post('/api/test/reset-db', async (req, res) => {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    res.status(200).send({ ok: true });
  });
}
```
Verify this endpoint works by sending a POST request to `/api/test/reset-db` when the server is running in test mode.

---

## 7. Create Page Objects in `e2e/src/pages/`

For each main page, create a file (e.g., `HomePage.ts`) and encapsulate all selectors, actions, and assertions using ARIA roles and accessible labels. Example:
```ts
import { Page } from '@playwright/test';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';

export class HomePage {
  constructor(private page: Page) {}
  async goto() { await this.page.goto('/'); return this; }
  async assertProductVisible(name: string) {
    await this.page.getByRole('heading', { name }).waitFor({ state: 'visible' });
  }
  async goToProduct(name: string): Promise<ProductPage> {
    await this.page.getByRole('heading', { name }).click();
    return new ProductPage(this.page);
  }
  async goToCart(): Promise<CartPage> {
    await this.page.getByRole('link', { name: /cart/i }).click();
    return new CartPage(this.page);
  }
  async addProductToCart(name: string): Promise<this> {
    await this.page.getByRole('button', { name: 'Add to Cart' }).click();
    return this;
  }
}
```
Repeat for `ProductPage`, `CartPage`, `CheckoutPage`.

---

## 8. Create Playwright Fixture for Page Objects and DB Reset

In `e2e/src/fixtures.ts`:
```ts
import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

type MyFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  productPage: async ({ page }, use) => { await use(new ProductPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  // Global DB reset before each test
  beforeEach: async ({ request }, use) => {
    await request.post('/api/test/reset-db');
    await use();
  },
});
export { expect } from '@playwright/test';
```

---

## 9. Write E2E Test Files in `e2e/src/`

Example: `product-list.spec.ts`
```ts
import { test } from './fixtures';

test('user can see a list of products', async ({ homePage }) => {
  await homePage.goto();
  await homePage.assertProductVisible('Product 1');
  await homePage.assertProductVisible('Product 2');
});
```

---

## 10. Use ARIA Roles and Accessible Labels for All Selectors

- In your React components, ensure all interactive elements have appropriate ARIA roles and accessible labels.
- In your page objects, use Playwright's `getByRole` and `getByLabelText` for all selectors.
- **Do NOT use ids, class names, or test ids for selectors.**
- If you encounter strict mode violations or multiple matches, use a more specific ARIA-based selector (e.g., a unique role and name combination, or a parent-child relationship with ARIA roles).
- Example:
  ```ts
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('heading', { name: 'Product 1' });
  await page.getByRole('link', { name: /cart/i });
  // If needed, use getByText with exact: true, but only if the text is unique and ARIA roles are not available
  await page.getByText('Stylish T-shirt', { exact: true });
  ```

---

## 11. Run and Verify E2E Tests

1. Build and run all E2E tests with one command:
   ```sh
   npm run test:e2e:full
   ```
2. Verify:
   - The frontend is served by the backend.
   - The backend API and test-only endpoints work.
   - All E2E tests pass and are isolated.

---

## 12. Document the Workflow

- In `e2e/README.md`, document:
  - How to build, start, and test the app.
  - How to write new E2E tests using the fixture and page objects.
  - The use of ARIA roles and accessible labels for selectors.
- In `server/README.md`, document:
  - How the backend serves the built frontend.
  - How to enable and use the test-only DB reset endpoint.
