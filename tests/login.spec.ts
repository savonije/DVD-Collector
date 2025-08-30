import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate and wait for network to be idle
        await page.goto('/login', { waitUntil: 'networkidle' });

        // Optional: wait for main container to appear before any test
        await expect(page.getByTestId('login-form')).toBeVisible({
            timeout: 5000,
        });
    });

    test('should render the login form', async ({ page }) => {
        const elements = [
            'login-title',
            'input-email',
            'input-password',
            'btn-submit',
        ];

        for (const testId of elements) {
            const locator = page.getByTestId(testId);
            await expect(locator).toBeVisible({ timeout: 5000 });
        }
    });
});
