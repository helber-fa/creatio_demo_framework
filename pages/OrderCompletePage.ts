import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderCompletePage extends BasePage {
    private readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.successMessage = this.page.getByText(
            'Thank you for your order!'
        );
    }

    async expectOrderCompleted(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
    }
}