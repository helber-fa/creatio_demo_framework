import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../data/products';
import { OrderCompletePage } from './OrderCompletePage';

export class CheckoutOverviewPage extends BasePage {
    private readonly finishButton: Locator;
    private readonly subtotal: Locator;
    private readonly tax: Locator;
    private readonly total: Locator;

    constructor(page: Page) {
        super(page);

        this.finishButton = this.page.getByRole('button', {
            name: 'Finish',
        });
        this.subtotal = this.page.locator('[data-test="subtotal-label"]');
        this.tax = this.page.locator('[data-test="tax-label"]');
        this.total = this.page.locator('[data-test="total-label"]');
    }

    async expectProductIncluded(product: Product): Promise<void> {
        await expect(
            this.page.getByText(product.name)
        ).toBeVisible();
    }

    async finish(): Promise<OrderCompletePage> {
        await this.finishButton.click();
        return new OrderCompletePage(this.page);
    }

    private async getAmount(locator: Locator): Promise<number> {
        const text = await locator.innerText();
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getSubtotal(): Promise<number> {
        return this.getAmount(this.subtotal);
    }

    async getTax(): Promise<number> {
        return this.getAmount(this.tax);
    }

    async getTotal(): Promise<number> {
        return this.getAmount(this.total);
    }
}