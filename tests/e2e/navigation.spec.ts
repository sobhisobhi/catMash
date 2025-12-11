import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('devrait naviguer entre Vote et Résultats', async ({ page }) => {
    await page.goto('/');

    // Par défaut sur Vote
    await expect(page.locator('img[alt*="Chat"]')).toHaveCount(2);

    // Aller sur Résultats
    await page.getByRole('button', { name: /résultats/i }).click();
    await expect(page.getByText(/classement/i)).toBeVisible();

    // Retour sur Vote
    await page.getByRole('button', { name: /voter/i }).click();
    await expect(page.locator('img[alt*="Chat"]')).toHaveCount(2);
  });

  test('devrait mettre en surbrillance le bouton actif', async ({ page }) => {
    await page.goto('/');

    const voteButton = page.getByRole('button', { name: /voter/i });
    const resultsButton = page.getByRole('button', { name: /résultats/i });

    // Vérifier que Vote est actif
    await expect(voteButton).toHaveCSS('background-color', /rgb\(76, 175, 80\)/);

    // Cliquer sur Résultats
    await resultsButton.click();
    await expect(resultsButton).toHaveCSS('background-color', /rgb\(76, 175, 80\)/);
  });
});