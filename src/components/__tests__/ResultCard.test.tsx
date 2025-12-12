import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultCard } from '../ResultCard';

describe('ResultCard', () => {
  const mockCat = {
    id: 'cat-1',
    url: 'https://example.com/cat.jpg',
    score: 1456,
    votes: 12,
  };

  it('devrait afficher le rang correctement', () => {
    render(<ResultCard cat={mockCat} rank={1} />);

    // Chercher le texte avec l'emoji ou utiliser un matcher flexible
    const rankElement = screen.getByTestId('rank');
    expect(rankElement).toHaveTextContent(/🥇.*#1/);
  });

  it('devrait afficher le rang 2', () => {
    render(<ResultCard cat={mockCat} rank={2} />);

    const rankElement = screen.getByTestId('rank');
    expect(rankElement).toHaveTextContent(/🥈.*#2/);
  });

  it('devrait afficher le rang 3', () => {
    render(<ResultCard cat={mockCat} rank={3} />);

    const rankElement = screen.getByTestId('rank');
    expect(rankElement).toHaveTextContent(/🥉.*#3/);
  });

  it('devrait afficher un rang sans emoji pour les autres positions', () => {
    render(<ResultCard cat={mockCat} rank={4} />);

    const rankElement = screen.getByTestId('rank');
    expect(rankElement).toHaveTextContent('#4');
  });

  it('devrait afficher le score et les votes', () => {
    render(<ResultCard cat={mockCat} rank={1} />);

    expect(screen.getByText('1456')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it("devrait afficher l'image avec le bon alt", () => {
    render(<ResultCard cat={mockCat} rank={5} />);

    const image = screen.getByAltText('Chat classé 5');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCat.url);
  });

  it("devrait avoir l'attribut data-testid", () => {
    render(<ResultCard cat={mockCat} rank={1} />);

    expect(screen.getByTestId('result-card')).toBeInTheDocument();
    expect(screen.getByTestId('rank')).toBeInTheDocument();
    expect(screen.getByTestId('elo-score')).toBeInTheDocument();
    expect(screen.getByTestId('vote-count')).toBeInTheDocument();
  });
});
