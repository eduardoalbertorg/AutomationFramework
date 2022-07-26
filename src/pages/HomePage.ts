import { expect, Frame, Locator, Page } from "@playwright/test";
import { Menu } from "./Menu";

export class TodayPage extends Menu{
    readonly page: Page;
    readonly getTitleLocator: Locator;
    readonly getQuickAddTaskButtonLocator: Locator; // This button is located in the top bar
    readonly getTaskNameLocator: Locator;
    readonly getDescriptionLocator: Locator;
    readonly getAddTaskModalButtonLocator: Locator; // This is the button from the modal popup
    readonly getTodayItemsListLocator: Locator;
    readonly getTodayTasksListTitleLocator: Locator;
    readonly getModalInboxButtonLocator: Locator;
    

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Today's section
        this.getTitleLocator = this.page.locator('text="Today: Todoist"').nth(1);
        this.getQuickAddTaskButtonLocator = this.page.locator('id=quick_add_task_holder');
        this.getTaskNameLocator = this.page.locator('div[role="textbox"]');
        this.getDescriptionLocator = this.page.locator('[placeholder="Description"]');

        // Modal popup
        this.getAddTaskModalButtonLocator = this.page.locator('[data-testid="task-editor-submit-button"]');
        this.getTodayItemsListLocator = this.page.locator('section[aria-label]:nth-child(2) >> ul[class="items"] >> li');
        this.getTodayTasksListTitleLocator = this.page.locator('section[aria-label]:nth-child(2) >> ul[class="items"] >> li >> div.task_list_item__content >> div.task_content');
        
    }

    async clickAddTaskModalButton(): Promise<void> {
        await this.getAddTaskModalButtonLocator.click();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async clickQuickAddTaskButton(): Promise<void> {
        await this.getQuickAddTaskButtonLocator.click();
    }

    async enterTaskname(taskname: string): Promise<void> {
        await this.getTaskNameLocator.fill(taskname);
    }

    async enterDescription(description: string): Promise<void> {
        await this.getDescriptionLocator.fill(description);
    }

    async getTodayTasksMap() {
        const tasksMap = await this.getTodayTasksListTitleLocator.evaluateAll(
            list => list.map(element => element.textContent)
        );
        return tasksMap;
    }

}