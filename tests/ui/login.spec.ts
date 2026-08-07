import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { invalidLoginData, users } from '../../data/users';

test('user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
        users.standard.username,
        users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

for (const data of invalidLoginData) {
    test(`user cannot login with invalid credentials: ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(data.username, data.password);

        await loginPage.expectLoginError(data.expectedError);
    });
}