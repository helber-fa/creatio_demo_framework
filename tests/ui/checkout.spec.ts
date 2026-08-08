import { test, expect } from '../../fixtures/test';
import { products } from '../../data/products';
import { users } from '../../data/users';

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