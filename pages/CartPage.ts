import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../data/products';
import { CheckoutPage } from './CheckoutPage';

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

    async checkout(): Promise<CheckoutPage> {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }

    async getProductPrice(product: Product): Promise<number> {
        const cartItem = this.page
            .locator('.cart_item')
            .filter({ hasText: product.name });
        const priceText = await cartItem
            .locator('.inventory_item_price')
            .innerText();
        return Number(priceText.replace('$', ''));
    }

    async expectProductNotAdded(product: Product): Promise<void> {
        await expect(
            this.page.getByText(product.name)
        ).not.toBeVisible();
    }
}