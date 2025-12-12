import { test, expect } from '@playwright/test';

test.describe('Page de Vote', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait afficher le titre de l\'application', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /catmash/i })).toBeVisible();
  });

  test('devrait afficher deux chats pour voter', async ({ page }) => {
    // Attendre que les images soient chargées
    await page.waitForSelector('img[alt*="Chat"]', { timeout: 10000 });
    
    const images = page.locator('img[alt*="Chat"]');
    await expect(images).toHaveCount(2);
  });

  test('devrait afficher le texte VS entre les chats', async ({ page }) => {
    await expect(page.getByText('VS')).toBeVisible();
  });

  test('devrait permettre de voter pour un chat', async ({ page }) => {
    // Attendre le chargement
    await page.waitForSelector('img[alt*="Chat"]', { timeout: 10000 });
    
    const catCards = page.locator('button').filter({ hasText: /Cliquez pour voter/i });
    const firstCard = catCards.first();
    
    await firstCard.click();
    
    // Attendre le changement (animation)
    await page.waitForTimeout(500);
    
    // Vérifier qu'une nouvelle paire est affichée
    await expect(page.locator('img[alt*="Chat"]')).toHaveCount(2);
  });
});