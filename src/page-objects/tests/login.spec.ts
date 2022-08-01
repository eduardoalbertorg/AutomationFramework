/**
 * author: eduardo.rodriguez@wizeline.com
 * 
 * 
 * Successful login.
    - Define a test case that performs a successful login,
    using credentials stored preferably in a .env file
 * Unsuccessful login.
    - Define multiple negative scenarios for login.
 */

import { test, expect } from '@playwright/test'

// Pages import
import { HomePage } from '../pages/home-page'
import { LandingPage } from '../pages/landing-page'
import { LoginPage } from '../pages/login-page'

import { URLS, CREDENTIALS, VALIDATONS } from '../data/constants'


test.describe('Login', () => {

    let loginPage: LoginPage
    let homePage: HomePage
    let landingPage: LandingPage
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        landingPage = new LandingPage(page)

        await page.goto(URLS.BASE_URL)
    })

    test('Successful login - @smoke', async ({ page }) => {
        homePage = new HomePage(page)
        await landingPage.clickLoginButton()
        await loginPage.enterEmail(CREDENTIALS.VALID_USER.USERNAME as string)
        await loginPage.enterPassword(CREDENTIALS.VALID_USER.PASSWORD as string)
        await loginPage.clickLoginButton()
        await expect(homePage.title).toBeVisible()
    })

    test('Unsuccessful login - Valid user, Invalid password @integration', async () => {
        await landingPage.clickLoginButton()
        await loginPage.enterEmail(CREDENTIALS.VALID_USER.USERNAME as string)
        await loginPage.enterPassword(CREDENTIALS.INVALID_USER.PASSWORD as string)
        await loginPage.clickLoginButton()
        await expect(await loginPage.getWrongCredentialsErrorMessage()).toEqual(VALIDATONS.MESSAGES.ERROR.WRONG_EMAIL_OR_PASSWORD)
    })

    test('Unsuccessful login - Invalid user, Invalid password @integration', async () => {
        await landingPage.clickLoginButton()
        await loginPage.enterEmail(CREDENTIALS.INVALID_USER.USERNAME as string)
        await loginPage.enterPassword(CREDENTIALS.INVALID_USER.PASSWORD as string)
        await loginPage.clickLoginButton()
        await expect(await loginPage.getWrongCredentialsErrorMessage()).toEqual(VALIDATONS.MESSAGES.ERROR.WRONG_EMAIL_OR_PASSWORD)
    })

    test('Unsuccessful login - Valid user, empty password @integration', async () => {
        await landingPage.clickLoginButton()
        await loginPage.enterEmail(CREDENTIALS.VALID_USER.USERNAME as string)
        await loginPage.enterPassword(CREDENTIALS.EMPTY_USER.PASSWORD as string)
        await loginPage.clickLoginButton()
        await expect(await loginPage.getEmptyPasswordErrorMessage()).toEqual(VALIDATONS.MESSAGES.ERROR.PASSWORD_MUST_BE_AT_LEAST_8_CHARS_LONG)
    })

    test('Unsuccessful login - Empty user, empty password @integration', async () => {
        await landingPage.clickLoginButton()
        await loginPage.enterEmail(CREDENTIALS.EMPTY_USER.USERNAME as string)
        await loginPage.enterPassword(CREDENTIALS.EMPTY_USER.PASSWORD as string)
        await loginPage.clickLoginButton()
        await expect(await loginPage.getEnterValidErrorMessage()).toEqual(VALIDATONS.MESSAGES.ERROR.ENTER_VALID_EMAIL)
    })
    
})