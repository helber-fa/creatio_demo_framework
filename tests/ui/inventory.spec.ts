import { test } from '../../fixtures/test';
import { products } from '../../data/products';
import { users } from '../../data/users';

test('user can add product to cart', async ({ loginPage }) => {
    await loginPage.open();
    const inventoryPage = await loginPage.login(
        users.standard.username,
        users.standard.password
    );
    await inventoryPage.expectPageOpened();
    await inventoryPage.addProductToCart(products.backpack);
    const cartPage = await inventoryPage.openCart();
    await cartPage.expectProductAdded(products.backpack);
});

test('user can remove product from cart from inventory page', async ({ loginPage }) => {
    await loginPage.open();

    const inventoryPage = await loginPage.login(
        users.problem.username,
        users.problem.password
    );

    await inventoryPage.expectPageOpened();

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.removeProductFromCart(products.backpack);

    const cartPage = await inventoryPage.openCart();

    await cartPage.expectProductNotAdded(products.backpack);
});