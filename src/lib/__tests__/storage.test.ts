import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageService } from '../storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock as any;

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('devrait sauvegarder et récupérer les données', () => {
    const testData = {
      cats: [{ id: 'cat-1', url: 'test.jpg', score: 1400, votes: 0 }],
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

  it('devrait réinitialiser les données', () => {
    const testData = {
      cats: [{ id: 'cat-1', url: 'test.jpg', score: 1400, votes: 0 }],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(testData);
    StorageService.reset();

    const result = StorageService.load();
    expect(result).toBeNull();
  });

  it('devrait gérer plusieurs chats', () => {
    const testData = {
      cats: [
        { id: 'cat-1', url: 'test1.jpg', score: 1400, votes: 5 },
        { id: 'cat-2', url: 'test2.jpg', score: 1450, votes: 3 },
        { id: 'cat-3', url: 'test3.jpg', score: 1380, votes: 8 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(testData);
    const retrieved = StorageService.load();

    expect(retrieved?.cats).toHaveLength(3);
    expect(retrieved?.cats[0].score).toBe(1400);
  });

  it('devrait gérer les erreurs lors de la sauvegarde', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Forcer une erreur
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Storage full');
    });

    const testData = {
      cats: [],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(testData);

    expect(consoleSpy).toHaveBeenCalled();
    // consoleSpy.mockRestore();
  });

  it('devrait gérer les erreurs lors du chargement avec JSON invalide', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mettre des données JSON invalides
    localStorage.setItem('catmash_data', 'invalid json {{{');

    const result = StorageService.load();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('devrait gérer les erreurs lors de la réinitialisation', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Forcer une erreur
    vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {
      throw new Error('Cannot remove');
    });

    StorageService.reset();

    expect(consoleSpy).toHaveBeenCalled();
    // consoleSpy.mockRestore();
  });
});
