import { Page, expect, test } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class CartRow {
  constructor(private page: Page, private productName: string) {}

  private get row() {
    return this.page.getByRole('row').filter({ hasText: this.productName });
  }

  private get quantityInput() {
    return this.row.getByRole('textbox');
  }

  private get removeButton() {
    return this.row.getByRole('button').last();
  }

  async updateQuantity(quantity: number) {
    await test.step(`Update quantity for '${this.productName}' to ${quantity}`, async () => {
      await this.quantityInput.fill(String(quantity));
      await this.quantityInput.press('Tab');
    });
  }

  async remove() {
    await test.step(`Remove product '${this.productName}' from cart`, async () => {
      await this.removeButton.click();
    });
  }

  async assertVisible() {
    await test.step(`Assert product '${this.productName}' is visible in cart`, async () => {
      await expect(this.row).toBeVisible();
    });
  }
}

export class CartPage {
  constructor(private page: Page) {}

  private get emptyCartMessage() {
    return this.page.getByText('Your cart is empty', { exact: true });
  }

  private get checkoutButton() {
    return this.page.getByRole('link', { name: 'Checkout' });
  }

  getCartRow(productName: string): CartRow {
    return new CartRow(this.page, productName);
  }

  async assertProductVisible(name: string) {
    await test.step(`Assert product '${name}' is visible in cart`, async () => {
      await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    });
  }
  
  async assertEmptyCart() {
    await test.step('Assert cart is empty', async () => {
      await expect(this.emptyCartMessage).toBeVisible();
    });
  }
  
  async updateQuantity(productName: string, quantity: number) {
    const row = this.getCartRow(productName);
    await row.updateQuantity(quantity);
  }
  
  async removeProduct(productName: string) {
    const row = this.getCartRow(productName);
    await row.remove();
  }
  
  async proceedToCheckout(): Promise<CheckoutPage> {
    await test.step('Proceed to checkout', async () => {
      await this.checkoutButton.click();
    });
    return new CheckoutPage(this.page);
  }
} 