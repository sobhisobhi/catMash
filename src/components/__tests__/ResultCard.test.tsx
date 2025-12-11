import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultCard } from '../ResultCard/ResultCard';

describe('ResultCard', () => {
  const mockCat = {
    id: 'cat-1',
    url: 'https://example.com/cat.jpg',
    score: 1456,
    votes: 12,
  };

  it('devrait afficher le rang correctement', () => {
    render(<ResultCard cat={mockCat} rank={1} />);
    
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('devrait afficher le score et les votes', () => {
    render(<ResultCard cat={mockCat} rank={1} />);
    
    expect(screen.getByText('1456')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('devrait afficher une icône spéciale pour le top 3', () => {
    const { rerender } = render(<ResultCard cat={mockCat} rank={1} />);
    expect(screen.getByText(/🥇|👑/)).toBeInTheDocument();
    
    rerender(<ResultCard cat={mockCat} rank={2} />);
    expect(screen.getByText(/🥈/)).toBeInTheDocument();
    
    rerender(<ResultCard cat={mockCat} rank={3} />);
    expect(screen.getByText(/🥉/)).toBeInTheDocument();
  });
});