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

// Framework imports
import { HomePage } from '../../src/pages/LandingPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { TodayPage } from '../../src/pages/HomePage';

const validationMessagesMap = new Map<string, string>([
    ['PASSWORD_MUST_BE_AT_LEAST_8_CHARS_LONG', 'Passwords must be at least 8 characters long.'],
    ['WRONG_EMAIL_OR_PASSWORD', "Wrong email or password."],
    ['HOMEPAGE_TITLE', 'Today: Todoist'],
]);


test.describe('Inbox', () => {


    
});