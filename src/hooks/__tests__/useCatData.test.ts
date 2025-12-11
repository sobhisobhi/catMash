import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCatData } from '../useCatData';

global.fetch = vi.fn();

describe('useCatData Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('devrait charger les données depuis l\'API', async () => {
    const mockData = {
      images: [
        'https://example.com/cat1.jpg',
        'https://example.com/cat2.jpg',
      ],
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useCatData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cats).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('devrait gérer les erreurs API', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.cats).toHaveLength(0);
  });

  it('devrait charger depuis le localStorage si disponible', async () => {
    const storedData = {
      cats: [
        { id: 'cat-1', url: 'test.jpg', score: 1400, votes: 5 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('catmash_data', JSON.stringify(storedData));

    const { result } = renderHook(() => useCatData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cats).toHaveLength(1);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});