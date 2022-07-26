/**
 * author: eduardo.rodriguez@wizeline.com
 * 
 * 
 * Create a new task.
    - Create a new task and validate it was created correctly.
 * Create 10 new tasks.
    - Create 10 new tasks and validate they were created correctly.
    - Task Names should be dynamic.
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';

// Framework imports
import { HomePage } from '../../src/pages/LandingPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { TodayPage } from '../../src/pages/HomePage';
import { InboxPage, OrderEnum, SortByEnum, ViewAsValueEnum } from '../../src/pages/InboxPage';
import { CommonUtils } from '../../src/utils/CommonUtils';

const testData = JSON.parse(fs.readFileSync('./tests/login/TestData.json', 'utf-8'));

test.describe('Task', () => {

    test('Create a task and validate it was created correctly - @e2e, @smoke', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const todayPage = new TodayPage(page);
        const inboxPage = new InboxPage(page);
        const commonUtils = new CommonUtils();
        const randomTaskname = commonUtils.generateRandomString();
        const randomDescription = commonUtils.generateRandomString();

        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.VALID_USERNAME as string);
        await loginPage.enterPassword(process.env.VALID_PASSWORD as string);
        await loginPage.clickLoginButton();

        await expect(page).toHaveTitle(testData.HOMEPAGE_TITLE);

        await todayPage.clickQuickAddTaskButton();
        await todayPage.enterTaskname(randomTaskname);
        await todayPage.enterDescription(randomDescription);
        await todayPage.clickAddTaskModalButton();

        await inboxPage.navigateToInbox();
        await inboxPage.filterViewAs(ViewAsValueEnum.LIST);
        await inboxPage.sortBy(SortByEnum.DATE_ADDED);
        await inboxPage.orderBy(OrderEnum.DESCENDING);
        await inboxPage.closeViewFilterPopup();
        const actualTaskMap = await inboxPage.getTasksList();

        expect(actualTaskMap.get(randomTaskname)).toBeTruthy();
    });

    test('Create 10 new tasks and validate they were created correctly - @e2e, @integration', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const todayPage = new TodayPage(page);
        const inboxPage = new InboxPage(page);
        const commonUtils = new CommonUtils();
        const tasksMap = new Map<string, string>();
        let count = 0;

        for (let index = 0; index < 10; index++) {
            const randomTaskname = commonUtils.generateRandomString();
            const randomDescription = commonUtils.generateRandomString();
            tasksMap.set(randomTaskname, randomDescription);
        }
        
        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.enterEmail(process.env.VALID_USERNAME as string);
        await loginPage.enterPassword(process.env.VALID_PASSWORD as string);
        await loginPage.clickLoginButton();

        await expect(page).toHaveTitle(testData.HOMEPAGE_TITLE);

        for await (const [taskName, description] of tasksMap) {
            count++;
            console.log(`## Run #${count}`);
            await todayPage.clickQuickAddTaskButton();
            await todayPage.enterTaskname(taskName);
            await todayPage.enterDescription(description);
            await todayPage.clickAddTaskModalButton();    
        }

        await inboxPage.navigateToInbox();
        await inboxPage.filterViewAs(ViewAsValueEnum.LIST);
        await inboxPage.sortBy(SortByEnum.DATE_ADDED);
        await inboxPage.orderBy(OrderEnum.DESCENDING);
        await inboxPage.closeViewFilterPopup();
        const actualTaskMap = await inboxPage.getTasksList();

        for await (const [title, description] of tasksMap) {
            expect(actualTaskMap.has(title)).toBeTruthy();
            expect(actualTaskMap.get(title)).toEqual(description);
        }
        
    });
    
});