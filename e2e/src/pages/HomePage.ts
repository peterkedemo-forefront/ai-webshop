import { Page, expect, test } from '@playwright/test';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';

export class HomePage {
  constructor(private page: Page) {}

  getProductCard(name: string) {
    return new ProductCard(this.page, name);
  }

  private get cartLink() {
    return this.page.getByRole('button', { name: 'Cart', exact: true });
  }

  async goto() {
    await test.step('Go to homepage', async () => {
      await this.page.goto('/');
    });
    return this;
  }

  async goToCart(): Promise<CartPage> {
    await test.step('Go to cart', async () => {
      await this.cartLink.click();
    });
    return new CartPage(this.page);
  }
}

export class ProductCard {
  constructor(private page: Page, private name: string) {}

  private get card() {
    return this.page.getByRole('region', { name: `Product: ${this.name}` });
  }

  private get detailsLink() {
    return this.card.getByRole('link', { name: `View details for ${this.name}` });
  }

  private get addToCartButton() {
    return this.card.getByRole('button', { name: `Add ${this.name} to cart` });
  }

  async assertVisible() {
    await test.step(`Assert product card '${this.name}' is visible`, async () => {
      await expect(this.card).toBeVisible();
    });
  }

  async clickDetails(): Promise<ProductPage> {
    await test.step(`Click details for product '${this.name}'`, async () => {
      await this.detailsLink.click();
    });
    return new ProductPage(this.page, this.name);
  }

  async clickAddToCart() {
    await test.step(`Click add to cart for product '${this.name}'`, async () => {
      await this.addToCartButton.click();
    });
  }
} 