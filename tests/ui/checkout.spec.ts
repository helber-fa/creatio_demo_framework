import { test, expect } from '../../fixtures/test';
import { products } from '../../data/products';
import { users } from '../../data/users';
import { invalidCheckoutData } from '../../data/checkout';

test('user can complete purchase', async ({ loginPage }) => {
    await loginPage.open();
    const inventoryPage = await loginPage.login(
        users.standard.username,
        users.standard.password
    );
    await inventoryPage.expectPageOpened();
    const inventoryPrice = await inventoryPage.getProductPrice(
        products.backpack
    );
    await inventoryPage.addProductToCart(products.backpack);

    const cartPage = await inventoryPage.openCart();
    await cartPage.expectProductAdded(products.backpack);
    const cartPrice = await cartPage.getProductPrice(
        products.backpack
    );
    expect(cartPrice).toBeCloseTo(inventoryPrice, 2);

    const checkoutPage = await cartPage.checkout();
    await checkoutPage.fillCustomerInformation(
        'Oleksandr',
        'Automation',
        '21000'
    );

    const overviewPage = await checkoutPage.continue();
    await overviewPage.expectProductIncluded(products.backpack);
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();
    expect(subtotal).toBeCloseTo(inventoryPrice, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    const orderCompletePage = await overviewPage.finish();
    await orderCompletePage.expectOrderCompleted();
});

for (const data of invalidCheckoutData) {
    test(`user cannot continue checkout with invalid data: ${data.description}`, async ({ loginPage }) => {
        await loginPage.open();

        const inventoryPage = await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await inventoryPage.expectPageOpened();
        await inventoryPage.addProductToCart(products.backpack);

        const cartPage = await inventoryPage.openCart();
        await cartPage.expectProductAdded(products.backpack);

        const checkoutPage = await cartPage.checkout();

        await checkoutPage.fillCustomerInformation(
            data.firstName,
            data.lastName,
            data.postalCode
        );

        await checkoutPage.continue();

        await checkoutPage.expectCheckoutError(data.expectedError);
    });
}
