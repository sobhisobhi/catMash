import { Cat } from '@/types/cat';
import styles from './ResultCard.module.scss';

interface ResultCardProps {
  cat: Cat;
  rank: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ cat, rank }) => {
  const getRankIcon = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '';
    }
  };

  return (
    <article className={styles.card} data-testid="result-card">
      <div className={styles.rank} data-testid="rank">
        {getRankIcon(rank)} #{rank}
      </div>
      <div className={styles.imageWrapper}>
        <img
          src={cat.url}
          alt={`Chat classé ${rank}`}
          loading="lazy"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.scoreRow}>
          <span className={styles.label}>Score Elo:</span>
          <span className={styles.value} data-testid="elo-score">
            {cat.score}
          </span>
        </div>
        <div className={styles.scoreRow}>
          <span className={styles.label}>Votes:</span>
          <span className={styles.value} data-testid="vote-count">
            {cat.votes}
          </span>
        </div>
      </div>
    </article>
  );
};
