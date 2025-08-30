import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test('should navigate to /login successfully', async ({ page }) => {
        const response = await page.goto('/login');

        expect(response?.ok()).toBeTruthy();
        expect(page.url()).toContain('/login');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('should render the login form', async ({ page }) => {
        await expect(page.getByTestId('login-title')).toBeVisible();
        await expect(page.getByTestId('input-email')).toBeVisible();
        await expect(page.getByTestId('input-password')).toBeVisible();
        await expect(page.getByTestId('btn-submit')).toBeVisible();
    });

    // test('should show an error if email is missing', async ({ page }) => {
    //     await page.getByTestId('input-password').fill('password123');
    //     await page.getByTestId('btn-submit').click();
    //     await expect(page.getByTestId('error-message')).toBeVisible();
    // });

    // test('should show an error if password is missing', async ({ page }) => {
    //     await page.getByTestId('input-email').fill('test@example.com');
    //     await page.getByTestId('btn-submit').click();
    //     await expect(page.getByTestId('error-message')).toBeVisible();
    // });

    // test('should submit when both email and password are filled', async ({
    //     page,
    // }) => {
    //     await page.getByTestId('input-email').fill('test@example.com');
    //     await page.getByTestId('input-password').fill('password123');
    //     await page.getByTestId('btn-submit').click();

    //     await expect(page.locator('[data-testid="error-message"]')).toHaveCount(
    //         0,
    //     );
    // });
});
