import { Page, expect, test } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page, private name: string) {}

  private get productHeading() {
    return this.page.getByRole('heading', { name: this.name, exact: true });
  }

  private get addToCartButton() {
    return this.page.getByRole('button', { name: `Add to Cart`, exact: true });
  }

  async assertProductDetailsVisible() {
    await test.step(`Assert product details heading '${this.name}' is visible`, async () => {
      await expect(this.productHeading).toBeVisible();
    });
  }

  async clickAddToCart() {
    await test.step(`Click add to cart'`, async () => {
      await this.addToCartButton.click();
    });
  }
}
