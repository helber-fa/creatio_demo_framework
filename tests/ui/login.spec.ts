import { invalidLoginData, users } from '../../data/users';
import { test } from '../../fixtures/test';

test('user can login successfully', async ({ loginPage }) => {
    await loginPage.open();
    const inventoryPage = await loginPage.login(
        users.standard.username,
        users.standard.password);
    await inventoryPage.expectPageOpened();
});

for (const data of invalidLoginData) {
    test(`user cannot login with invalid credentials: ${data.username}`, async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.loginExpectingError(data.username, data.password);
        await loginPage.expectLoginError(data.expectedError);
    });
}