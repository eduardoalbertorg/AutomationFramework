import { expect, Locator, Page } from "@playwright/test";

export class WebActions {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isElementVisible(locator: Locator) {
        await this.waitForElement(locator);
        await locator.isVisible();
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor();
    }

    async clickOnElement(locator: Locator): Promise<void> {
        await this.waitForElement(locator);
        await locator.click();
    }

    async setDelay(milliseconds: number): Promise<void> {
        return new Promise(function(resolve) {
            setTimeout(resolve, milliseconds);
        });
    }

    async fillElementText(locator: Locator, text: string): Promise<void> {
        await this.waitForElement(locator);
        await locator.fill(text);
    }

    async verifyElementContainsText(locator: Locator, text: string): Promise<void> {
        await this.waitForElement(locator);
        await expect(locator).toContainText(text);
    }


}