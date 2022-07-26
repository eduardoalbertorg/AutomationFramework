import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly getLoginHeaderLocator: Locator;
    readonly getEmailTextboxLocator: Locator;
    readonly getPasswordTextboxLocator: Locator;
    readonly getLoginButtonLocator: Locator;
    readonly getWrongCredentialsErrorMessageLocator: Locator;
    readonly getEmptyPasswordErrorMessageLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getLoginHeaderLocator = this.page.locator('h1', { hasText: 'Log in' });
        this.getEmailTextboxLocator = this.page.locator('input[placeholder="Enter your email..."]');
        this.getPasswordTextboxLocator = this.page.locator('input[placeholder="Enter your password..."]');
        this.getLoginButtonLocator = this.page.locator('button', { hasText: 'Log in'});
        this.getWrongCredentialsErrorMessageLocator = this.page.locator('text="Wrong email or password."');
        this.getEmptyPasswordErrorMessageLocator = this.page.locator('text="Passwords must be at least 8 characters long."');
    }

    async getMinimumPasswordLengthErrorMessage() {
        // TODO
        return null;
    }

    async getEmptyPasswordErrorMessage() {
        return await this.getEmptyPasswordErrorMessageLocator.innerText();
    }

    async isWrongCredentialsErrorMessageLocatorVisible(): Promise<boolean> {
        return await this.getWrongCredentialsErrorMessageLocator.isVisible();
    }

    async getWrongCredentialsErrorMessage(): Promise<string> {
        return await this.getWrongCredentialsErrorMessageLocator.innerText();    
    }

    async enterEmail(email: string) {
        await this.getEmailTextboxLocator.fill(email);
    }

    async enterPassword(password: string) {
        await this.getPasswordTextboxLocator.fill(password);
    }

    async clickLoginButton() {
        await this.getLoginButtonLocator.click();
    }

}