import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('devrait naviguer entre Vote et Résultats', async ({ page }) => {
    await page.goto('/');
    
    // Attendre le chargement
    await page.waitForSelector('img[alt*="Chat"]', { timeout: 10000 });

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
    
    await page.waitForSelector('img[alt*="Chat"]', { timeout: 10000 });

    const voteButton = page.getByRole('button', { name: /^🗳️ Voter$/ });
    await expect(voteButton).toHaveClass(/active/);
    
    const resultsButton = page.getByRole('button', { name: /résultats/i });

    // Vérifier que Vote est actif (a la classe active)

    // Cliquer sur Résultats
    await resultsButton.click();
    await expect(resultsButton).toHaveClass(/active/);
  });
});