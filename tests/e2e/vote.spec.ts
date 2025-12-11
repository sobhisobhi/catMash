import { test, expect } from '@playwright/test';

test.describe('Page de Vote', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait afficher le titre de l\'application', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /catmash/i })).toBeVisible();
  });

  test('devrait afficher deux chats pour voter', async ({ page }) => {
    await expect(page.locator('img[alt*="Chat"]')).toHaveCount(2);
  });

  test('devrait afficher le texte VS entre les chats', async ({ page }) => {
    await expect(page.getByText('VS')).toBeVisible();
  });

  test('devrait permettre de voter pour un chat', async ({ page }) => {
    const firstCat = page.locator('img[alt*="Chat"]').first();
    const initialSrc = await firstCat.getAttribute('src');

    await firstCat.click();

    // Attendre le changement de paire
    await page.waitForTimeout(500);

    const newFirstCat = page.locator('img[alt*="Chat"]').first();
    const newSrc = await newFirstCat.getAttribute('src');

    // Les chats devraient avoir changé
    expect(newSrc).not.toBe(initialSrc);
  });

  test('devrait afficher l\'overlay au survol', async ({ page }) => {
    const catCard = page.locator('[role="button"]').first();
    await catCard.hover();

    await expect(page.getByText(/cliquez pour voter/i)).toBeVisible();
  });
});