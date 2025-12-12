import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../Navigation/Navigation';

describe('Navigation', () => {
  it('devrait afficher les deux boutons de navigation', () => {
    const handleViewChange = vi.fn();
    render(<Navigation currentView="vote" onViewChange={handleViewChange} />);

    expect(screen.getByRole('button', { name: /voter/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /résultats/i })
    ).toBeInTheDocument();
  });

  it('devrait marquer le bouton Vote comme actif quand currentView est vote', () => {
    const handleViewChange = vi.fn();
    render(<Navigation currentView="vote" onViewChange={handleViewChange} />);

    const voteButton = screen.getByRole('button', { name: /voter/i });
    expect(voteButton).toHaveAttribute('aria-current', 'page');
  });

  it('devrait marquer le bouton Résultats comme actif quand currentView est results', () => {
    const handleViewChange = vi.fn();
    render(
      <Navigation currentView="results" onViewChange={handleViewChange} />
    );

    const resultsButton = screen.getByRole('button', { name: /résultats/i });
    expect(resultsButton).toHaveAttribute('aria-current', 'page');
  });

  it('devrait appeler onViewChange avec "vote" quand le bouton Vote est cliqué', () => {
    const handleViewChange = vi.fn();
    render(
      <Navigation currentView="results" onViewChange={handleViewChange} />
    );

    const voteButton = screen.getByRole('button', { name: /voter/i });
    fireEvent.click(voteButton);

    expect(handleViewChange).toHaveBeenCalledWith('vote');
  });

  it('devrait appeler onViewChange avec "results" quand le bouton Résultats est cliqué', () => {
    const handleViewChange = vi.fn();
    render(<Navigation currentView="vote" onViewChange={handleViewChange} />);

    const resultsButton = screen.getByRole('button', { name: /résultats/i });
    fireEvent.click(resultsButton);

    expect(handleViewChange).toHaveBeenCalledWith('results');
  });
});
