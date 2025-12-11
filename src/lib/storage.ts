import { StoredData } from '@/types/cat';
import { STORAGE_KEY } from './constants';

export class StorageService {
  static save(data: StoredData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }

  static load(): StoredData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return null;
    }
  }

  static reset(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
    }
  }
}