import { expect, Frame, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly getLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getLoginButton = this.page.locator('text=Log in').nth(1);
    }

    async goto() {
        await this.page.goto('https://todoist.com/');
    }

    async clickLoginButton() {
        await this.getLoginButton.click();
    }
}