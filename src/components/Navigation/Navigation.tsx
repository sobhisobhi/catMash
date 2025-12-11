import styles from './Navigation.module.scss';

interface NavigationProps {
  currentView: 'vote' | 'results';
  onViewChange: (view: 'vote' | 'results') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <nav className={styles.nav}>
      <button
        onClick={() => onViewChange('vote')}
        className={`${styles.button} ${currentView === 'vote' ? styles.active : ''}`}
        aria-current={currentView === 'vote' ? 'page' : undefined}
      >
        🗳️ Voter
      </button>
      <button
        onClick={() => onViewChange('results')}
        className={`${styles.button} ${currentView === 'results' ? styles.active : ''}`}
        aria-current={currentView === 'results' ? 'page' : undefined}
      >
        📊 Résultats
      </button>
    </nav>
  );
};