import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageService } from '../storage';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('devrait sauvegarder et récupérer les données', () => {
    const testData = {
      cats: [
        { id: 'cat-1', url: 'test.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(testData);
    const retrieved = StorageService.load();

    expect(retrieved).toEqual(testData);
  });

  it('devrait retourner null si aucune donnée', () => {
    const result = StorageService.load();
    expect(result).toBeNull();
  });

  it('devrait gérer les erreurs de parsing JSON', () => {
    localStorage.setItem('catmash_data', 'invalid json');
    const result = StorageService.load();
    expect(result).toBeNull();
  });

  it('devrait réinitialiser les données', () => {
    const testData = {
      cats: [],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(testData);
    StorageService.reset();
    
    const result = StorageService.load();
    expect(result).toBeNull();
  });
});