import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginError(message: string): Promise<void> {
        await expect(this.errorMessage).toContainText(message);
    }
}