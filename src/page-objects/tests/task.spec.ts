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

import { test, expect } from '@playwright/test'

// Framework imports
import { HomePage } from '../pages/home-page'
import { LandingPage } from '../pages/landing-page'
import { LoginPage } from '../pages/login-page'
import { InboxPage, OrderEnum, SortByEnum, ViewAsValueEnum } from '../pages/inbox-page'
import { CommonUtils } from '../../utils/common-utils'
import { URLS, CREDENTIALS } from '../data/constants'


test.describe('Task', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    let landingPage: LandingPage
    let inboxPage: InboxPage
    let commonUtils: CommonUtils
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        landingPage = new LandingPage(page)
        inboxPage = new InboxPage(page)
        commonUtils = new CommonUtils()

        await page.goto(URLS.BASE_URL)
    })

    test('Create a task and validate it was created correctly - @e2e, @smoke', async () => {
        const randomTaskname = commonUtils.generateRandomString()
        const randomDescription = commonUtils.generateRandomString()

        await test.step('# Step 1. Login ', async () => {
            await landingPage.clickLoginButton()
            await loginPage.enterEmail(CREDENTIALS.VALID_USER.USERNAME as string)
            await loginPage.enterPassword(CREDENTIALS.VALID_USER.PASSWORD as string)
            await loginPage.clickLoginButton()
            await expect(homePage.title).toBeVisible()
        })

        await test.step('# Step 2. Create task', async () => {
            await homePage.clickQuickAddTaskButton()
            await homePage.enterTaskname(randomTaskname)
            await homePage.enterDescription(randomDescription)
            await homePage.clickAddTaskModalButton()
        })

        await test.step('# Step 3. Go to inbox', async () => {
            await inboxPage.navigateToInbox()
        })

        await test.step('# Step 4. Filter view as: list, date added, descending', async () => {
            await inboxPage.filterViewAs(ViewAsValueEnum.LIST)
            await inboxPage.sortBy(SortByEnum.DATE_ADDED)
            await inboxPage.orderBy(OrderEnum.DESCENDING)
            await inboxPage.closeViewFilterPopup()
        })

        await test.step('# Step 5. Validate task', async () => {
            const actualTaskMap = await inboxPage.getTasksList()
            expect(actualTaskMap.get(randomTaskname)).toBeTruthy()
        })
              
    })

    test('Create 10 new tasks and validate they were created correctly - @e2e, @integration', async () => {
        const tasksMap = new Map<string, string>()
        let count = 0

        await test.step('# Step 0. Prereq: Create 10 random tasks', async () => {    
            for (let index = 0; index < 10; index++) {
                const randomTaskname = commonUtils.generateRandomString()
                const randomDescription = commonUtils.generateRandomString()
                tasksMap.set(randomTaskname, randomDescription)
            }
        })

        await test.step('# Step 1. Login ', async () => {
            await landingPage.clickLoginButton()
            await loginPage.enterEmail(CREDENTIALS.VALID_USER.USERNAME as string)
            await loginPage.enterPassword(CREDENTIALS.VALID_USER.PASSWORD as string)
            await loginPage.clickLoginButton()
            await expect(homePage.title).toBeVisible()
        })

        await test.step('# Step 2. Create 10 tasks', async () => {
            for await (const [taskName, description] of tasksMap) {
                count++
                console.log(`## Run #${count}`)
                await homePage.clickQuickAddTaskButton()
                await homePage.enterTaskname(taskName)
                await homePage.enterDescription(description)
                await homePage.clickAddTaskModalButton()    
            }
        })

        await test.step('# Step 3. Go to inbox', async () => {
            await inboxPage.navigateToInbox()
        })

        await test.step('# Step 4. Filter view as: list, date added, descending', async () => {
            await inboxPage.filterViewAs(ViewAsValueEnum.LIST)
            await inboxPage.sortBy(SortByEnum.DATE_ADDED)
            await inboxPage.orderBy(OrderEnum.DESCENDING)
            await inboxPage.closeViewFilterPopup()
        })

        await test.step('# Step 5. Validate created tasks', async () => {
            const actualTaskMap = await inboxPage.getTasksList()

            for await (const [title, description] of tasksMap) {
                expect(actualTaskMap.has(title)).toBeTruthy()
                expect(actualTaskMap.get(title)).toEqual(description)
            }
        })

    })
    
})