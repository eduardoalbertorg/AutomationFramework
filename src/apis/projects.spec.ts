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

import { CommonUtils } from '../utils/common-utils'
import { URLS, ENDPOINTS } from './data/constants'

test.describe('Projects', () => {
    let commonUtils: CommonUtils
    
    test.beforeEach(async ({ page }) => {
        commonUtils = new CommonUtils()

        await page.goto(URLS.BASE_URL)
    })

    test('GET /v1/projects - @api, @projects, @get', async ({ request }) => {
        const randomTaskname = commonUtils.generateRandomString()
        const randomDescription = commonUtils.generateRandomString()

        await test.step('#1 Verify OK status response ', async () => {
            const projects = await request.get(ENDPOINTS.PROJECTS)
            expect(projects.ok()).toBeTruthy()
        })     
    })

    test('Create 10 new tasks and validate they were created correctly - @e2e, @integration', async () => {
        

    })
    
})