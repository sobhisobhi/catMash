import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} aria-label="Chargement"></div>
      <p className={styles.text}>Chargement des chats...</p>
    </div>
  );
};
