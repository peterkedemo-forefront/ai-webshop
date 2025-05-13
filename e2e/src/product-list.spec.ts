import { test } from './fixtures';

test('user can see a list of products', async ({ homePage }) => {
  await homePage.goto();

  const card = homePage.getProductCard('Stylish T-shirt');
  
  await card.assertVisible();
});

test('user can add a product to cart', async ({ homePage }) => {
  await homePage.goto();

  const card = homePage.getProductCard('Stylish T-shirt');
  await card.clickAddToCart();

  const cartPage = await homePage.goToCart();
  await cartPage.assertProductVisible('Stylish T-shirt');
}); 