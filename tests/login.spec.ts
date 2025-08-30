import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        // Pipe console logs from the browser
        page.on('console', (msg) =>
            console.log(`[BROWSER] ${msg.type()}: ${msg.text()}`),
        );

        // Pipe runtime errors
        page.on('pageerror', (err) =>
            console.log(`[PAGE ERROR] ${err.message}`),
        );

        await page.goto('/login');
    });

    test('should render the login form', async ({ page }) => {
        // Optional: log the page title instead of full HTML
        console.log(`[DEBUG] Page title: ${await page.title()}`);

        await expect(page.getByTestId('login-title')).toBeVisible();
        await expect(page.getByTestId('input-email')).toBeVisible();
        await expect(page.getByTestId('input-password')).toBeVisible();
        await expect(page.getByTestId('btn-submit')).toBeVisible();
    });
});
