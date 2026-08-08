import { test } from '../../fixtures/test';
import { products } from '../../data/products';
import { users } from '../../data/users';

test('user can proceed to checkout', async ({ loginPage }) => {
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
        'Oleksandr',
        'Automation',
        '21000'
    );

    await checkoutPage.continue();
});