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

import { test, expect } from '@playwright/test';
import fs from 'fs';

// Pages import
import { HomePage } from '../../src/pages/LandingPage';
import { LoginPage } from '../../src/pages/LoginPage';


const testData = JSON.parse(fs.readFileSync('./tests/login/TestData.json', 'utf-8'));


test.describe('Login', () => {

    test('Successful login - @smoke', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.VALID_USERNAME as string);
        await loginPage.enterPassword(process.env.VALID_PASSWORD as string);
        await loginPage.clickLoginButton();

        await expect(page).toHaveTitle(testData.HOMEPAGE_TITLE);
    });

    test('Unsuccessful login - Valid user, Invalid password @integration', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.VALID_USERNAME as string);
        await loginPage.enterPassword(process.env.INVALID_PASSWORD as string);
        await loginPage.clickLoginButton();
        
        await expect(await loginPage.getWrongCredentialsErrorMessage()).toEqual(testData.WRONG_EMAIL_OR_PASSWORD);
    });

    test('Unsuccessful login - Invalid user, Invalid password @integration', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.INVALID_USERNAME as string);
        await loginPage.enterPassword(process.env.INVALID_PASSWORD as string);
        await loginPage.clickLoginButton();
        
        await expect(await loginPage.getWrongCredentialsErrorMessage()).toEqual(testData.WRONG_EMAIL_OR_PASSWORD);
    });

    test('Unsuccessful login - Valid user, empty password @integration', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.VALID_USERNAME as string);
        await loginPage.enterPassword(process.env.EMPTY_PASSWORD as string);
        await loginPage.clickLoginButton();
        
        await expect(await loginPage.getEmptyPasswordErrorMessage()).toEqual(testData.PASSWORD_MUST_BE_AT_LEAST_8_CHARS_LONG);
    });

    test.skip('Unsuccessful login - Valid user, 5 char spaces password @integration', async ({ page }) => {
        // TODO
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLoginButton();
        //await loginPage.enterEmail(validationMessagesMap.get('VALID_USERNAME') as string);
        await loginPage.enterPassword('     ');
        await loginPage.clickLoginButton();
        
        await expect(await loginPage.getMinimumPasswordLengthErrorMessage()).toEqual('');
    });
    
});