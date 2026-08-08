import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../data/products';

export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.checkoutButton = this.page.getByRole('button', {
            name: 'Checkout',
        });
    }

    async open(): Promise<void> {
        await this.page.goto('/cart.html');
    }

    async expectProductAdded(product: Product): Promise<void> {
        await expect(
            this.page.getByText(product.name)
        ).toBeVisible();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}