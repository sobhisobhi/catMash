import { test, expect } from '@playwright/test';

test.describe('Performance et Accessibilité', () => {
  test('devrait charger rapidement', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000); // Moins de 3 secondes
  });

  test('devrait avoir des images optimisées', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });

  test('devrait être accessible au clavier', async ({ page }) => {
    await page.goto('/');

    // Tab vers le premier bouton de navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Devrait pouvoir activer avec Enter
    await page.keyboard.press('Enter');
    
    // Vérifier qu'on peut naviguer
    await expect(page.getByText(/classement|voter/i)).toBeVisible();
  });

  test('devrait avoir des attributs alt sur les images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});