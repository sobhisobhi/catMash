import { describe, it, expect } from 'vitest';
import { calculateElo } from '../elo';

describe('Algorithme Elo', () => {
  it('devrait calculer correctement le score quand le favori gagne', () => {
    const result = calculateElo(1600, 1400);
    
    expect(result.newWinnerScore).toBeGreaterThan(1600);
    expect(result.newLoserScore).toBeLessThan(1400);
    expect(result.newWinnerScore).toBeLessThan(1620); // Gain modéré car favori
  });

  it('devrait calculer correctement le score quand l\'outsider gagne', () => {
    const result = calculateElo(1400, 1600);
    
    expect(result.newWinnerScore).toBeGreaterThan(1400);
    expect(result.newLoserScore).toBeLessThan(1600);
    expect(result.newWinnerScore - 1400).toBeGreaterThan(20); // Gain important
  });

  it('devrait maintenir un total de points stable', () => {
    const initialTotal = 1500 + 1500;
    const result = calculateElo(1500, 1500);
    const finalTotal = result.newWinnerScore + result.newLoserScore;
    
    // Le total peut varier légèrement à cause de l'arrondi
    expect(Math.abs(finalTotal - initialTotal)).toBeLessThan(3);
  });

  it('devrait retourner des scores arrondis', () => {
    const result = calculateElo(1456, 1523);
    
    expect(Number.isInteger(result.newWinnerScore)).toBe(true);
    expect(Number.isInteger(result.newLoserScore)).toBe(true);
  });
});