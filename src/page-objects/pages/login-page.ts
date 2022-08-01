import { expect, Locator, Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page
    readonly loginHeader: Locator
    readonly emailTextbox: Locator
    readonly passwordTextbox: Locator
    readonly loginButton: Locator
    readonly wrongCredentialsErrorMessage: Locator
    readonly emptyPasswordErrorMessage: Locator
    readonly enterValidEmailErrorMessage: Locator


    constructor(page: Page) {
        this.page = page
        this.loginHeader = this.page.locator('h1', { hasText: 'Log in' })
        this.emailTextbox = this.page.locator('input[placeholder="Enter your email..."]')
        this.passwordTextbox = this.page.locator('input[placeholder="Enter your password..."]')
        this.loginButton = this.page.locator('button', { hasText: 'Log in'})
        this.wrongCredentialsErrorMessage = this.page.locator('text="Wrong email or password."')
        this.emptyPasswordErrorMessage = this.page.locator('text="Passwords must be at least 8 characters long."')
        this.enterValidEmailErrorMessage = this.page.locator('text="Please enter a valid email address."')
    }

    async getEnterValidErrorMessage() {
        return await this.enterValidEmailErrorMessage.innerText()
    }

    async getEmptyPasswordErrorMessage() {
        return await this.emptyPasswordErrorMessage.innerText()
    }

    async isWrongCredentialsErrorMessageLocatorVisible(): Promise<boolean> {
        return await this.wrongCredentialsErrorMessage.isVisible()
    }

    async getWrongCredentialsErrorMessage(): Promise<string> {
        return await this.wrongCredentialsErrorMessage.innerText()    
    }

    async enterEmail(email: string) {
        console.log(`# Entering the email field."`)
        await this.emailTextbox.fill(email)
    }

    async enterPassword(password: string) {
        console.log(`# Entering the password field."`)
        await this.passwordTextbox.fill(password)
    }

    async clickLoginButton() {
        console.log('# Clicking on the log in button.')
        await this.loginButton.click()
    }

}