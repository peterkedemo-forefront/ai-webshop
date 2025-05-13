import { test } from './fixtures';

test('user can view product details', async ({ homePage }) => {
  await homePage.goto();

  const card = homePage.getProductCard('Stylish T-shirt');
  const productPage = await card.clickDetails();

  await productPage.assertProductDetailsVisible('Stylish T-shirt');
});

test('user can add product to cart from details page', async ({ homePage }) => {
  await homePage.goto();

  const card = homePage.getProductCard('Stylish T-shirt');
  const productPage = await card.clickDetails();

  await productPage.assertProductDetailsVisible('Stylish T-shirt');
  await productPage.clickAddToCart();

  const cartPage = await homePage.goToCart();
  await cartPage.assertProductVisible('Stylish T-shirt');
}); 