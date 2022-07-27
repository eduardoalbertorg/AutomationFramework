import { expect, Frame, Locator, Page } from "@playwright/test"

export class LandingPage {
    readonly page: Page
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.loginButton = this.page.locator('text=Log in').nth(1)
    }

    async goto() {
        await this.page.goto('https://todoist.com/')
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }
}