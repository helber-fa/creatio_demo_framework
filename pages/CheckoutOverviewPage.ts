import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../data/products';
import { OrderCompletePage } from './OrderCompletePage';

export class CheckoutOverviewPage extends BasePage {
    private readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);

        this.finishButton = this.page.getByRole('button', {
            name: 'Finish',
        });
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
}