import { useState, useEffect } from 'react';
import { Cat } from '@/types/cat';
import { CATS_API_URL, INITIAL_ELO } from '@/lib/constants';
import { StorageService } from '@/lib/storage';
import { calculateElo } from '@/lib/elo';
import { imageCache } from '@/lib/imageCache';

interface ApiCatImage {
  url: string;
  id: string;
}

interface ApiResponse {
  images: ApiCatImage[];
}

export const useCatData = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    try {
      const stored = StorageService.load();

      if (stored && stored.cats && stored.cats.length > 0) {
        console.log('✅ Chargement depuis localStorage:', stored.cats.length, 'chats');
        setCats(stored.cats);
        setLoading(false);
        return;
      }
      console.log('🌐 Chargement depuis l\'API:', CATS_API_URL);
      const response = await fetch(CATS_API_URL);

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const data: ApiResponse = await response.json();
      console.log('📦 Données reçues:', data.images.length, 'images');


      if (!data.images || data.images.length === 0) {
        throw new Error('Aucune image de chat trouvée dans l\'API');
      }

      // Transformer les données de l'API en objets Cat
      const initialCats: Cat[] = data.images.map((apiCat, index) => ({
        id: apiCat.id || `cat-${index}`,
        url: apiCat.url,
        score: INITIAL_ELO,
        votes: 0,
      }));

      console.log('✅ Chats créés:', initialCats.length);
      console.log('🖼️ Exemple:', initialCats[0]);

      setCats(initialCats);
      StorageService.save({
        cats: initialCats,
        lastUpdated: new Date().toISOString(),
      });

      setLoading(false);

    } catch (err) {
      console.error('❌ Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLoading(false);
    }
  };

  const updateCatScores = (winnerId: string, loserId: string) => {
    setCats(prevCats => {
      const winner = prevCats.find(c => c.id === winnerId);
      const loser = prevCats.find(c => c.id === loserId);

      if (!winner || !loser) {
        console.error('❌ Chat introuvable:', { winnerId, loserId });
        return prevCats;
      }

      const { newWinnerScore, newLoserScore } = calculateElo(winner.score, loser.score);

      const newCats = prevCats.map(cat => {
        if (cat.id === winnerId) {
          return { ...cat, score: newWinnerScore, votes: cat.votes + 1 };
        }
        if (cat.id === loserId) {
          return { ...cat, score: newLoserScore, votes: cat.votes + 1 };
        }
        return cat;
      });

      StorageService.save({
        cats: newCats,
        lastUpdated: new Date().toISOString(),
      });

      return newCats;
    });
  };

  const resetData = () => {
    StorageService.reset();
    // imageCache.clear();
    window.location.reload();
  };

  return { cats, loading, error, updateCatScores, resetData };
};
