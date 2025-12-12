'use client';

import { useState, useEffect } from 'react';
import { Cat } from '@/types/cat';
import { useCatData } from '@/hooks/useCatData';
import { CatCard } from '@/components/CatCard/CatCard';
import { ResultCard } from '@/components/ResultCard/ResultCard';
import { Navigation } from '@/components/Navigation/Navigation';
import { Loading } from '@/components/Loading/Loading';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import styles from './page.module.scss';

export default function Home() {
  const { cats, loading, error, updateCatScores, resetData } = useCatData();
  const [view, setView] = useState<'vote' | 'results'>('vote');
  const [pair, setPair] = useState<[Cat, Cat] | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (cats.length >= 2 && view === 'vote') {
      getRandomPair();
    }
  }, [cats, view]);

  const getRandomPair = () => {
    if (cats.length < 2) return;
    const shuffled = [...cats].sort(() => Math.random() - 0.5);
    setPair([shuffled[0], shuffled[1]]);
  };

  const handleVote = (winnerId: string, loserId: string) => {
    setFadeOut(true);
    setTimeout(() => {
      updateCatScores(winnerId, loserId);
      setFadeOut(false);
      getRandomPair();
    }, 300);
  };

  const sortedCats = [...cats].sort((a, b) => b.score - a.score);
  const totalVotes = cats.reduce((sum, cat) => sum + cat.votes, 0);

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🐱 CatMash</h1>
        <p className={styles.subtitle}>Trouve le chat le plus mignon !</p>
        <Navigation currentView={view} onViewChange={setView} />
      </header>

      <main className={styles.main}>
        {view === 'vote' && pair && (
          <div
            className={`${styles.voteContainer} ${fadeOut ? styles.fadeOut : ''}`}
          >
            <CatCard
              cat={pair[0]}
              onClick={() => handleVote(pair[0].id, pair[1].id)}
            />
            <div className={styles.versus}>VS</div>
            <CatCard
              cat={pair[1]}
              onClick={() => handleVote(pair[1].id, pair[0].id)}
            />
          </div>
        )}

        {view === 'results' && (
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>🏆 Classement des chats</h2>
              <button onClick={resetData} className={styles.resetButton}>
                🔄 Réinitialiser
              </button>
            </div>
            <div className={styles.catGrid}>
              {sortedCats.map((cat, index) => (
                <ResultCard key={cat.id} cat={cat} rank={index + 1} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          Développé avec ❤️ | {cats.length} chats | {totalVotes} votes totaux
        </p>
      </footer>
    </div>
  );
}

/* 'use client';

import { useState, useEffect } from 'react';
import { Cat } from '@/types/cat';
import { useCatData } from '@/hooks/useCatData';
import styles from './page.module.scss';

export default function Home() {
  const { cats, loading, error, updateCatScores, resetData } = useCatData();
  const [view, setView] = useState<'vote' | 'results'>('vote');
  const [pair, setPair] = useState<[Cat, Cat] | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (cats.length >= 2 && view === 'vote') {
      getRandomPair();
    }
  }, [cats, view]);

  const getRandomPair = () => {
    if (cats.length < 2) return;
    const shuffled = [...cats].sort(() => Math.random() - 0.5);
    setPair([shuffled[0], shuffled[1]]);
  };

  const handleVote = (winnerId: string, loserId: string) => {
    setFadeOut(true);
    setTimeout(() => {
      updateCatScores(winnerId, loserId);
      setFadeOut(false);
      getRandomPair();
    }, 300);
  };

  const sortedCats = [...cats].sort((a, b) => b.score - a.score);
  const totalVotes = cats.reduce((sum, cat) => sum + cat.votes, 0);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Chargement des chats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>❌ Erreur</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.button}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🐱 CatMash</h1>
        <p className={styles.subtitle}>Trouve le chat le plus mignon !</p>

        <nav className={styles.nav}>
          <button
            onClick={() => setView('vote')}
            className={`${styles.navButton} ${view === 'vote' ? styles.active : ''}`}
          >
            🗳️ Voter
          </button>
          <button
            onClick={() => setView('results')}
            className={`${styles.navButton} ${view === 'results' ? styles.active : ''}`}
          >
            📊 Résultats
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        {view === 'vote' && pair && (
          <div className={`${styles.voteContainer} ${fadeOut ? styles.fadeOut : ''}`}>
            <div
              className={styles.catCard}
              onClick={() => handleVote(pair[0].id, pair[1].id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={pair[0].url}
                  alt="Chat mignon à voter"
                  className={styles.catImage}
                  onError={(e) => {
                    console.error('Erreur de chargement image:', pair[0].url);
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="20"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.clickText}>Cliquez pour voter</span>
              </div>
            </div>

            <div className={styles.versus}>VS</div>

            <div
              className={styles.catCard}
              onClick={() => handleVote(pair[1].id, pair[0].id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={pair[1].url}
                  alt="Chat mignon à voter"
                  className={styles.catImage}
                  onError={(e) => {
                    console.error('Erreur de chargement image:', pair[1].url);
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="20"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.clickText}>Cliquez pour voter</span>
              </div>
            </div>
          </div>
        )}

        {view === 'results' && (
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>🏆 Classement des chats</h2>
              <button onClick={resetData} className={styles.resetButton}>
                🔄 Réinitialiser
              </button>
            </div>

            <div className={styles.catGrid}>
              {sortedCats.map((cat, index) => (
                <div key={cat.id} className={styles.resultCard}>
                  <div className={styles.rank}>#{index + 1}</div>
                  <div className={styles.resultImageWrapper}>
                    <img
                      src={cat.url}
                      alt={`Chat classé numéro ${index + 1}`}
                      className={styles.resultImage}
                      onError={(e) => {
                        console.error('Erreur de chargement image:', cat.url);
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="250"%3E%3Crect fill="%23ddd" width="280" height="250"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className={styles.resultInfo}>
                    <div className={styles.scoreRow}>
                      <span className={styles.scoreLabel}>Score Elo:</span>
                      <span className={styles.scoreValue}>{cat.score}</span>
                    </div>
                    <div className={styles.scoreRow}>
                      <span className={styles.scoreLabel}>Votes:</span>
                      <span className={styles.scoreValue}>{cat.votes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Développé avec ❤️ | {cats.length} chats | {totalVotes} votes totaux</p>
      </footer>
    </div>
  );
} */
