import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('user cannot login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'invalid_password');
    await loginPage.expectLoginError('Epic sadface: Username and password do not match any user in this service');
});