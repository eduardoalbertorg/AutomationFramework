import { expect, Frame, Locator, Page } from "@playwright/test"
import { MenuPage } from "./menu-page"

export class HomePage extends MenuPage {
    readonly page: Page
    readonly title: Locator
    readonly quickAddTaskButton: Locator // This button is located in the top bar
    readonly taskTitleTextfield: Locator
    readonly descriptionTextfield: Locator
    readonly addTaskModalButton: Locator // This is the button from the modal popup
    readonly todayItemsList: Locator
    readonly todayTasksTitleList: Locator
    readonly modalInboxButton: Locator
    

    constructor(page: Page) {
        super(page)
        this.page = page
        // Today's section
        this.title = this.page.locator('.simple_content')
        this.quickAddTaskButton = this.page.locator('id=quick_add_task_holder')
        this.taskTitleTextfield = this.page.locator('div[role="textbox"]')
        this.descriptionTextfield = this.page.locator('[placeholder="Description"]')

        // Modal popup
        this.addTaskModalButton = this.page.locator('[data-testid="task-editor-submit-button"]')
        this.todayItemsList = this.page.locator('section[aria-label]:nth-child(2) >> ul[class="items"] >> li')
        this.todayTasksTitleList = this.page.locator('section[aria-label]:nth-child(2) >> ul[class="items"] >> li >> div.task_list_item__content >> div.task_content')
        
    }

    async clickAddTaskModalButton(): Promise<void> {
        await this.addTaskModalButton.click()
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title()
    }

    async clickQuickAddTaskButton(): Promise<void> {
        await this.quickAddTaskButton.click()
    }

    async enterTaskname(taskname: string): Promise<void> {
        await this.taskTitleTextfield.fill(taskname)
    }

    async enterDescription(description: string): Promise<void> {
        await this.descriptionTextfield.fill(description)
    }

    async getTodayTasksMap() {
        const tasksMap = await this.todayTasksTitleList.evaluateAll(
            list => list.map(element => element.textContent)
        )
        return tasksMap
    }

}