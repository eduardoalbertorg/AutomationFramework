import { Locator, Page } from "@playwright/test"
import { MenuPage } from "./menu-page"

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

export class InboxPage extends MenuPage {
    readonly page: Page
    readonly filterViewButton: Locator
    readonly filterViewOptionsMenu: Locator
    readonly inboxHeader: Locator
    readonly taskList: Locator
    // View As
    readonly viewAsDropDown: Locator
    readonly viewAsDropDownValues: Locator
    readonly viewAsListOption: Locator
    readonly viewAsBoardOption: Locator
    // Sort By
    readonly sortByDropDown: Locator
    readonly sortByDropDownValues: Locator
    readonly sortByDefault: Locator
    readonly sortByDateAdded: Locator
    // Order
    readonly orderDropDown: Locator
    readonly orderDropDownValues: Locator
    readonly orderAscending: Locator
    readonly orderDescending: Locator


    constructor(page: Page) {
        super(page)
        this.page = page
        this.filterViewButton = this.page.locator('button[aria-label="View options menu"]')
        this.filterViewOptionsMenu = this.page.locator('ul[aria-label="View options menu"]')
        this.inboxHeader = this.page.locator('h1')
        this.taskList = this.page.locator('ul.items> li.task_list_item')
        // View As
        this.viewAsDropDown = this.page.locator('li[aria-labelledby=view_menu__view_as]') // This is the button to display the values for the ViewAs selector
        this.viewAsDropDownValues = this.page.locator('[role="option"]') // This is the actual value list for the ViewAs selector
        this.viewAsListOption = this.page.locator('[data-value="list"]')
        this.viewAsBoardOption = this.page.locator('[data-value="board"]')
        // Sort By
        this.sortByDropDown = this.page.locator('li[aria-labelledby=view_menu__sort_by]')
        this.sortByDropDownValues = this.page.locator('[role="option"]')
        this.sortByDefault = this.page.locator('[data-value="default"]')
        this.sortByDateAdded = this.page.locator('[data-value="ADDED_DATE"]')
        // Order
        this.orderDropDown = this.page.locator('li[aria-labelledby=view_menu__order]')
        this.orderDropDownValues = this.page.locator('[role="option"]')
        this.orderAscending = this.page.locator('[data-value=ASC]')
        this.orderDescending = this.page.locator('[data-value=DESC]')
    }

    async getTasksList(): Promise<Map<string, string>> {
        const tasksMap = new Map<string, string>()
        const taskTitleList: string[] = await this.taskList.locator('div.task_content').allInnerTexts()
        const taskDescription: string[] = await this.taskList.locator('div.task_description').allInnerTexts()

        if (taskTitleList.length == taskDescription.length) {
            for (let index = 0; index < taskTitleList.length; index++) {
                const title = taskTitleList[index]
                const description = taskDescription[index]
                tasksMap.set(title, description)            
            }    
        } else {
            throw new Error('The number of titles and description read do not match, please verify selectors in getTaskList().')
        }
        return tasksMap
    }

    async selectOrder(value: OrderEnum) {
        switch (value) {
            case OrderEnum.ASCENDING:
                if (!(await this.orderAscending.getAttribute('aria-checked') === 'true')) {
                    await this.orderAscending.click()
                } else {
                    await this.orderAscending.press('Escape')
                }                
                break
            case OrderEnum.DESCENDING:
            default:
                if (!(await this.orderDescending.getAttribute('aria-checked') === 'true')) {
                    await this.orderDescending.click()
                } else {
                    await this.orderDescending.press('Escape')
                }                
                break
        }
    }

    async clickOnOrderDropDown() {
        if (await this.orderDropDown.isVisible()) {
            await this.orderDropDown.click()
        } else {
            throw new ReferenceError('"Order" button is not visible')
        }
    }

    async selectSortBy(value: SortByEnum) {
        switch (value) {
            case SortByEnum.DATE_ADDED:
                if (!(await this.sortByDateAdded.getAttribute('aria-checked'))) {
                    await this.sortByDateAdded.click()
                } else {
                    await this.sortByDateAdded.press('Escape')
                }
                break
            case SortByEnum.DEFAULT:
            default:
                if (!(await this.sortByDefault.getAttribute('aria-checked'))) {
                    await this.sortByDefault.click()
                } else {
                    await this.sortByDefault.press('Escape')
                }
                break
        }
    }

    async clickOnSortByDropDown() {
        if (await this.sortByDropDown.isVisible()) {
            await this.sortByDropDown.click()
        } else {
            throw new ReferenceError('"Sort by" button is not visible')
        }
    }

    async clickOnViewAsDropDown() {
        if (await this.viewAsDropDown.isVisible()) {
            await this.viewAsDropDown.click()
        } else {
            throw new ReferenceError('"View as" button is not visible')
        }
    }

    async selectValueFromViewAs(value: ViewAsValueEnum) {
        switch (value) {
            case ViewAsValueEnum.BOARD:
                if (!(await this.viewAsBoardOption.getAttribute('aria-checked') === 'true')) {
                    await this.viewAsBoardOption.click()
                } else {
                    await this.viewAsBoardOption.press('Escape')
                }
                break
            case ViewAsValueEnum.LIST:
            default:
                if (!(await this.viewAsListOption.getAttribute('aria-checked') === 'true')) {
                    await this.viewAsListOption.click()
                } else {
                    await this.viewAsListOption.press('Escape')
                }
                break
        }
    }

    async orderBy(by: OrderEnum) {
        await this.clickOnFilterViewButton()
        await this.clickOnOrderDropDown()
        await this.selectOrder(by)
    }

    async sortBy(by: SortByEnum) {
        await this.clickOnFilterViewButton()
        await this.clickOnSortByDropDown()
        await this.selectSortBy(by)
    }

    async filterViewAs(as: ViewAsValueEnum): Promise<void> {
        await this.clickOnFilterViewButton()
        await this.clickOnViewAsDropDown()
        await this.selectValueFromViewAs(as)
    }

    async isViewOptionsMenuVisible() {
        return await this.filterViewOptionsMenu.isVisible()
    }

    async clickOnFilterViewButton(): Promise<void> {
        if (!(await this.isViewOptionsMenuVisible())) {
            await this.filterViewButton.click()    
        }
    }

    async isFilterViewButtonVisible(): Promise<boolean> {
        return await this.filterViewButton.isVisible()
    }

    async navigateToInbox() {
        await this.clickOnMenuInboxButton()
    }

    async closeViewFilterPopup() {
        await this.filterViewOptionsMenu.press('Escape')
    }

}