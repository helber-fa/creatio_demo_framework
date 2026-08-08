import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';
import { Product } from '../data/products';

export class InventoryPage extends BasePage {
    private readonly productsTitle: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);

        this.productsTitle = this.page.getByText('Products');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    async open(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    async expectPageOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.productsTitle).toBeVisible();
    }

    async addProductToCart(product: Product): Promise<void> {
        const addToCartButton = this.page.locator(
            `[data-test="${product.testId}"]`
        );

        await addToCartButton.click();
    }

    async openCart(): Promise<CartPage> {
        await this.shoppingCartLink.click();

        return new CartPage(this.page);
    }

    async getProductPrice(product: Product): Promise<number> {
        const productCard = this.page
            .locator('.inventory_item')
            .filter({ hasText: product.name });
        const priceText = await productCard
            .locator('.inventory_item_price')
            .innerText();

        return Number(priceText.replace('$', ''));
    }
}