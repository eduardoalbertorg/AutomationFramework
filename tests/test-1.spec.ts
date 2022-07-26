import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://todoist.com/
  await page.goto('https://todoist.com/');

  // Click text=Log in >> nth=1
  await page.locator('text=Log in').nth(1).click();
  await expect(page).toHaveURL('https://todoist.com/auth/login');

  // Click [placeholder="Enter your email\.\.\."]
  await page.locator('[placeholder="Enter your email\\.\\.\\."]').click();

  // Fill [placeholder="Enter your email\.\.\."]
  await page.locator('[placeholder="Enter your email\\.\\.\\."]').fill('eduardoalbertorg@gmail.com');

  // Press Tab
  await page.locator('[placeholder="Enter your email\\.\\.\\."]').press('Tab');

  // Click [placeholder="Enter your password\.\.\."]
  await page.locator('[placeholder="Enter your password\\.\\.\\."]').click();

  // Fill [placeholder="Enter your password\.\.\."]
  await page.locator('[placeholder="Enter your password\\.\\.\\."]').fill('WL2021&*');

  // Click button:has-text("Log in")
  await page.locator('button:has-text("Log in")').click();
  await expect(page).toHaveURL('https://todoist.com/app/today');

  // Click [aria-label="Inbox\, 5 tasks"] >> text=Inbox
  await page.locator('[aria-label="Inbox\\, 5 tasks"] >> text=Inbox').click();
  await expect(page).toHaveURL('https://todoist.com/app/project/2294895711');

  // Click [aria-label="View options menu"]
  await page.locator('[aria-label="View options menu"]').click();

});