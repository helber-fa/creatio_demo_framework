import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

export class CheckoutPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', {
            name: 'Continue',
        });
    }

    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue(): Promise<CheckoutOverviewPage> {
        await this.continueButton.click();

        return new CheckoutOverviewPage(this.page);
    }
}