import { Cat } from '@/types/cat';
import styles from './CatCard.module.scss';

interface CatCardProps {
  cat: Cat;
  onClick: (id: string) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onClick }) => {
  return (
    <button
      className={styles.card}
      onClick={() => onClick(cat.id)}
      aria-label={`Voter pour ce chat`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={cat.url}
          alt="Chat mignon"
          loading="lazy"
          className={styles.image}
        />
      </div>
      <div className={styles.overlay}>
        <span className={styles.text}>Cliquez pour voter</span>
      </div>
    </button>
  );
};