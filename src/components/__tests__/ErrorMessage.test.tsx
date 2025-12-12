import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

describe('ErrorMessage', () => {
  it("devrait afficher le message d'erreur", () => {
    render(<ErrorMessage message="Une erreur est survenue" />);

    expect(screen.getByText('❌ Erreur')).toBeInTheDocument();
    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
  });

  it('devrait afficher le bouton Réessayer quand onRetry est fourni', () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message="Erreur" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /réessayer/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("ne devrait pas afficher le bouton Réessayer quand onRetry n'est pas fourni", () => {
    render(<ErrorMessage message="Erreur" />);

    const retryButton = screen.queryByRole('button', { name: /réessayer/i });
    expect(retryButton).not.toBeInTheDocument();
  });

  it('devrait appeler onRetry quand le bouton est cliqué', () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message="Erreur" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /réessayer/i });
    fireEvent.click(retryButton);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
