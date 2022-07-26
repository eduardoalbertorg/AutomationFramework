import { Locator, Page } from "@playwright/test";
import { WebActions } from "../lib/WebActions";
import { Menu } from "./Menu";

export enum ViewAsValueEnum {
    LIST = 1,
    BOARD = 2
}

export enum SortByEnum {
    DEFAULT = 1,
    DATE_ADDED = 2
}

export enum OrderEnum {
    ASCENDING = 1,
    DESCENDING = 2
}

export class InboxPage extends WebActions {
    readonly page: Page;
    readonly menu: Menu;
    readonly getFilterViewButtonLocator: Locator;
    readonly getFilterViewOptionsMenuLocator: Locator;
    readonly getInboxHeaderLocator: Locator;
    readonly getTaskListLocator: Locator;
    // View As
    readonly getViewAsDropDownLocator: Locator;
    readonly getViewAsDropDownValuesLocator: Locator;
    readonly getViewAsListOptionLocator: Locator;
    readonly getViewAsBoardOptionLocator: Locator;
    // Sort By
    readonly getSortByDropDownLocator: Locator;
    readonly getSortByDropDownValuesLocator: Locator;
    readonly getSortByDefaultLocator: Locator;
    readonly getSortByDateAddedLocator: Locator;
    // Order
    readonly getOrderDropDownLocator: Locator;
    readonly getOrderDropDownValuesLocator: Locator;
    readonly getOrderAscendingLocator: Locator;
    readonly getOrderDescendingLocator: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.menu = new Menu(this.page);
        this.getFilterViewButtonLocator = this.page.locator('button[aria-label="View options menu"]');
        this.getFilterViewOptionsMenuLocator = this.page.locator('ul[aria-label="View options menu"]');
        this.getInboxHeaderLocator = this.page.locator('h1');
        this.getTaskListLocator = this.page.locator('ul.items> li.task_list_item');
        // View As
        this.getViewAsDropDownLocator = this.page.locator('li[aria-labelledby=view_menu__view_as]'); // This is the button to display the values for the ViewAs selector
        this.getViewAsDropDownValuesLocator = this.page.locator('[role="option"]'); // This is the actual value list for the ViewAs selector
        this.getViewAsListOptionLocator = this.page.locator('[data-value="list"]');
        this.getViewAsBoardOptionLocator = this.page.locator('[data-value="board"]');
        // Sort By
        this.getSortByDropDownLocator = this.page.locator('li[aria-labelledby=view_menu__sort_by]');
        this.getSortByDropDownValuesLocator = this.page.locator('[role="option"]');
        this.getSortByDefaultLocator = this.page.locator('[data-value="default"]');
        this.getSortByDateAddedLocator = this.page.locator('[data-value="ADDED_DATE"]');
        // Order
        this.getOrderDropDownLocator = this.page.locator('li[aria-labelledby=view_menu__order]');
        this.getOrderDropDownValuesLocator = this.page.locator('[role="option"]');
        this.getOrderAscendingLocator = this.page.locator('[data-value=ASC]');
        this.getOrderDescendingLocator = this.page.locator('[data-value=DESC]');
    }

    async getTasksList(): Promise<Map<string, string>> {
        const tasksMap = new Map<string, string>();
        const taskTitleList: string[] = await this.getTaskListLocator.locator('div.task_content').allInnerTexts();
        const taskDescription: string[] = await this.getTaskListLocator.locator('div.task_description').allInnerTexts();

        if (taskTitleList.length == taskDescription.length) {
            for (let index = 0; index < taskTitleList.length; index++) {
                const title = taskTitleList[index];
                const description = taskDescription[index];
                tasksMap.set(title, description);            
            }    
        } else {
            throw new Error('The number of titles and description read do not match, please verify selectors in getTaskList().');
        }
        return tasksMap;
    }

    async selectOrder(value: OrderEnum) {
        switch (value) {
            case OrderEnum.ASCENDING:
                if (!(await this.getOrderAscendingLocator.getAttribute('aria-checked') === 'true')) {
                    await this.getOrderAscendingLocator.click();
                } else {
                    await this.getOrderAscendingLocator.press('Escape');
                }                
                break;
            case OrderEnum.DESCENDING:
            default:
                if (!(await this.getOrderDescendingLocator.getAttribute('aria-checked') === 'true')) {
                    await this.getOrderDescendingLocator.click();
                } else {
                    await this.getOrderDescendingLocator.press('Escape');
                }                
                break;
        }
    }

    async clickOnOrderDropDown() {
        if (await this.getOrderDropDownLocator.isVisible()) {
            await this.getOrderDropDownLocator.click();
        } else {
            throw new ReferenceError('"Order" button is not visible');
        }
    }

    async selectSortBy(value: SortByEnum) {
        switch (value) {
            case SortByEnum.DATE_ADDED:
                if (!(await this.getSortByDateAddedLocator.getAttribute('aria-checked'))) {
                    await this.getSortByDateAddedLocator.click();
                } else {
                    await this.getSortByDateAddedLocator.press('Escape');
                }
                break;
            case SortByEnum.DEFAULT:
            default:
                if (!(await this.getSortByDefaultLocator.getAttribute('aria-checked'))) {
                    await this.getSortByDefaultLocator.click();
                } else {
                    await this.getSortByDefaultLocator.press('Escape');
                }
                break;
        }
    }

    async clickOnSortByDropDown() {
        if (await this.getSortByDropDownLocator.isVisible()) {
            await this.getSortByDropDownLocator.click();
        } else {
            throw new ReferenceError('"Sort by" button is not visible');
        }
    }

    async clickOnViewAsDropDown() {
        if (await this.getViewAsDropDownLocator.isVisible()) {
            await this.getViewAsDropDownLocator.click();
        } else {
            throw new ReferenceError('"View as" button is not visible');
        }
    }

    async selectValueFromViewAs(value: ViewAsValueEnum) {
        switch (value) {
            case ViewAsValueEnum.BOARD:
                if (!(await this.getViewAsBoardOptionLocator.getAttribute('aria-checked') === 'true')) {
                    await this.getViewAsBoardOptionLocator.click();
                } else {
                    await this.getViewAsBoardOptionLocator.press('Escape');
                }
                break;
            case ViewAsValueEnum.LIST:
            default:
                if (!(await this.getViewAsListOptionLocator.getAttribute('aria-checked') === 'true')) {
                    await this.getViewAsListOptionLocator.click();
                } else {
                    await this.getViewAsListOptionLocator.press('Escape');
                }
                break;
        }
    }

    async orderBy(by: OrderEnum) {
        await this.clickOnFilterViewButton();
        await this.clickOnOrderDropDown();
        await this.selectOrder(by);
    }

    async sortBy(by: SortByEnum) {
        await this.clickOnFilterViewButton();
        await this.clickOnSortByDropDown();
        await this.selectSortBy(by);
    }

    async filterViewAs(as: ViewAsValueEnum): Promise<void> {
        await this.clickOnFilterViewButton();
        await this.clickOnViewAsDropDown();
        await this.selectValueFromViewAs(as);
    }

    async isViewOptionsMenuVisible() {
        return await this.getFilterViewOptionsMenuLocator.isVisible();
    }

    async clickOnFilterViewButton(): Promise<void> {
        if (!(await this.isViewOptionsMenuVisible())) {
            await this.getFilterViewButtonLocator.click();    
        }
    }

    async isFilterViewButtonVisible(): Promise<boolean> {
        return await this.getFilterViewButtonLocator.isVisible();
    }

    async navigateToInbox() {
        await this.menu.clickOnMenuInboxButton();
    }

    async closeViewFilterPopup() {
        await this.getFilterViewOptionsMenuLocator.press('Escape');
    }

}