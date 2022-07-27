import { Locator, Page } from "@playwright/test"

export class MenuPage {
    protected readonly page: Page
    protected readonly inboxButtonLocator: Locator

    constructor(page: Page) {
        this.page = page
        this.inboxButtonLocator = this.page.locator('id=filter_inbox')
    }

    async isMenuInboxButtonVisible(): Promise<boolean> {
        return await this.inboxButtonLocator.isVisible()
    }

    async clickOnMenuInboxButton(): Promise<void> {
        await this.inboxButtonLocator.click()
    }

}