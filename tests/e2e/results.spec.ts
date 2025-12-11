import { test, expect } from '@playwright/test';

test.describe('Page de Résultats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Effectuer quelques votes d'abord
    for (let i = 0; i < 3; i++) {
      await page.locator('img[alt*="Chat"]').first().click();
      await page.waitForTimeout(400);
    }

    // Naviguer vers les résultats
    await page.getByRole('button', { name: /résultats/i }).click();
  });

  test('devrait afficher le titre des résultats', async ({ page }) => {
    await expect(page.getByText(/classement des chats/i)).toBeVisible();
  });

  test('devrait afficher tous les chats', async ({ page }) => {
    const catCards = page.locator('[data-testid="result-card"]');
    const count = await catCards.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('devrait afficher les rangs dans l\'ordre', async ({ page }) => {
    const ranks = await page.locator('[data-testid="rank"]').allTextContents();
    
    for (let i = 0; i < ranks.length; i++) {
      expect(ranks[i]).toContain(`#${i + 1}`);
    }
  });

  test('devrait afficher les scores Elo', async ({ page }) => {
    const scores = page.locator('[data-testid="elo-score"]');
    await expect(scores.first()).toBeVisible();
    
    const scoreText = await scores.first().textContent();
    expect(scoreText).toMatch(/\d+/); // Devrait contenir un nombre
  });

  test('devrait afficher le nombre de votes', async ({ page }) => {
    const votes = page.locator('[data-testid="vote-count"]');
    await expect(votes.first()).toBeVisible();
  });

  test('devrait permettre de réinitialiser les données', async ({ page }) => {
    const resetButton = page.getByRole('button', { name: /réinitialiser/i });
    await expect(resetButton).toBeVisible();

    // Confirmer la réinitialisation
    page.on('dialog', dialog => dialog.accept());
    await resetButton.click();

    // Devrait recharger la page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });
});