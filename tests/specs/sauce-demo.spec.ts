import { test, expect } from '@fixtures/sauceDemoFixtures';

test.describe('SauceDemo end-to-end flows', () => {
  test('logs in successfully', async ({ loginPage, inventoryPage }) => {
    test.info().annotations.push(
      { type: 'Type', description: 'Smoke' },
      { type: 'Description', description: 'Verify that a standard user can log in successfully.' }
    );

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.page).toHaveURL(/inventory/);
  });

  test('places an order successfully', async ({ loginPage, inventoryPage, cartPage, checkoutPage, checkoutCompletePage, testData }) => {
    test.info().annotations.push(
      { type: 'Type', description: 'Regression' },
      { type: 'Description', description: 'Verify that a user can add an item to the cart and complete checkout.' }
    );

    await loginPage.open();
    await loginPage.login(testData.standardUser.username, testData.standardUser.password);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutPage.finishCheckout();

    await expect(checkoutCompletePage.thankYouMessage).toBeVisible();
    await expect(checkoutCompletePage.page).toHaveURL(/checkout-complete/);
  });
});
