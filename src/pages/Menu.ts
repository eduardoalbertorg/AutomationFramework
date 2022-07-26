import { Locator, Page } from "@playwright/test";

export class Menu {
    protected readonly page: Page;
    protected readonly getInboxButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getInboxButtonLocator = this.page.locator('id=filter_inbox');
    }

    async isMenuInboxButtonVisible(): Promise<boolean> {
        return await this.getInboxButtonLocator.isVisible();
    }

    async clickOnMenuInboxButton(): Promise<void> {
        await this.getInboxButtonLocator.click();
    }

}