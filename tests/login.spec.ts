import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('should render the login form', async ({ page }) => {
        await expect(page.getByTestId('login-title')).toBeVisible();
        await expect(page.getByTestId('input-email')).toBeVisible();
        await expect(page.getByTestId('input-password')).toBeVisible();
        await expect(page.getByTestId('btn-submit')).toBeVisible();
    });
});
