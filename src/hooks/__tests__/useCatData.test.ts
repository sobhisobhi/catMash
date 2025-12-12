import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCatData } from '../useCatData';
import { StorageService } from '@/lib/storage';
import { CATS_API_URL } from '@/lib/constants';

// Mock fetch global
global.fetch = vi.fn();

// Mock window.confirm
global.confirm = vi.fn(() => true);

// Mock window.location.reload
delete (window as any).location;
window.location = { reload: vi.fn() } as any;

describe('useCatData', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    // Reset fetch mock
    (global.fetch as any).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait charger les données depuis localStorage si disponibles', async () => {
    const mockData = {
      cats: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg', score: 1400, votes: 0 },
        { id: 'cat-2', url: 'http://test.com/cat2.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(mockData);

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cats).toHaveLength(2);
    expect(result.current.error).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("devrait charger les données depuis l'API si localStorage est vide", async () => {
    const mockApiResponse = {
      images: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg' },
        { id: 'cat-2', url: 'http://test.com/cat2.jpg' },
      ],
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useCatData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cats).toHaveLength(2);
    expect(result.current.cats[0].score).toBe(1000);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(CATS_API_URL);
  });

  it("devrait gérer les erreurs de l'API", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.cats).toHaveLength(0);
  });

  it('devrait gérer les erreurs réseau', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.cats).toHaveLength(0);
  });

  it('devrait mettre à jour les scores des chats', async () => {
    const mockData = {
      cats: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg', score: 1400, votes: 0 },
        { id: 'cat-2', url: 'http://test.com/cat2.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(mockData);

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.updateCatScores('cat-1', 'cat-2');
    });

    expect(result.current.cats[0].votes).toBe(1);
    expect(result.current.cats[1].votes).toBe(1);
    expect(result.current.cats[0].score).not.toBe(1400); // Score devrait changer
  });

  it('devrait gérer les IDs de chats invalides lors de la mise à jour', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockData = {
      cats: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(mockData);

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.updateCatScores('invalid-id', 'cat-1');
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('devrait réinitialiser les données avec confirmation', async () => {
    const mockData = {
      cats: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(mockData);

    (global.confirm as any).mockReturnValueOnce(true);

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.resetData();
    });

    expect(global.confirm).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("ne devrait pas réinitialiser si l'utilisateur annule", async () => {
    const mockData = {
      cats: [
        { id: 'cat-1', url: 'http://test.com/cat1.jpg', score: 1400, votes: 0 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    StorageService.save(mockData);

    (global.confirm as any).mockReturnValueOnce(false);

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.resetData();
    });

    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
