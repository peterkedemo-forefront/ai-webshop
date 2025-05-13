import { test } from './fixtures';

test('user can view empty cart', async ({ homePage }) => {
  await homePage.goto();
  
  const cartPage = await homePage.goToCart();
  await cartPage.assertEmptyCart();
});

test('user can update product quantity in cart', async ({ homePage }) => {
  await homePage.goto();
  
  const card = homePage.getProductCard('Stylish T-shirt');
  await card.clickAddToCart();
  
  const cartPage = await homePage.goToCart();
  const cartRow = cartPage.getCartRow('Stylish T-shirt');
  await cartRow.assertVisible();
  await cartRow.updateQuantity(3);
});

test('user can remove product from cart', async ({ homePage }) => {
  await homePage.goto();
  
  const card = homePage.getProductCard('Stylish T-shirt');
  await card.clickAddToCart();
  
  const cartPage = await homePage.goToCart();
  const cartRow = cartPage.getCartRow('Stylish T-shirt');
  await cartRow.remove();
  await cartPage.assertEmptyCart();
});

test('user can proceed to checkout from cart', async ({ homePage }) => {
  await homePage.goto();
  
  const card = homePage.getProductCard('Stylish T-shirt');
  await card.clickAddToCart();
  
  const cartPage = await homePage.goToCart();
  
  await cartPage.proceedToCheckout();
}); 