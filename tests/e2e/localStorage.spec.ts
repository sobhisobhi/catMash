import { test, expect } from '@playwright/test';

test.describe('Persistence des données', () => {
  test('devrait sauvegarder les votes dans localStorage', async ({ page }) => {
    await page.goto('/');

    // Voter
    await page.locator('img[alt*="Chat"]').first().click();
    await page.waitForTimeout(500);

    // Vérifier localStorage
    const storageData = await page.evaluate(() => {
      return localStorage.getItem('catmash_data');
    });

    expect(storageData).toBeTruthy();
    const parsed = JSON.parse(storageData!);
    expect(parsed.cats).toBeDefined();
    expect(parsed.lastUpdated).toBeDefined();
  });

  test('devrait conserver les données après rafraîchissement', async ({ page }) => {
    await page.goto('/');

    // Voter plusieurs fois
    for (let i = 0; i < 3; i++) {
      await page.locator('img[alt*="Chat"]').first().click();
      await page.waitForTimeout(400);
    }

    // Aller sur résultats et noter le premier score
    await page.getByRole('button', { name: /résultats/i }).click();
    const firstScore = await page.locator('[data-testid="elo-score"]').first().textContent();

    // Rafraîchir
    await page.reload();

    // Vérifier que les données sont toujours là
    await page.getByRole('button', { name: /résultats/i }).click();
    const newFirstScore = await page.locator('[data-testid="elo-score"]').first().textContent();

    expect(newFirstScore).toBe(firstScore);
  });
});