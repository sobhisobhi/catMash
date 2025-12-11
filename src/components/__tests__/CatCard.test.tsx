import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CatCard } from '../CatCard/CatCard';

describe('CatCard', () => {
  const mockCat = {
    id: 'cat-1',
    url: 'https://example.com/cat.jpg',
    score: 1400,
    votes: 5,
  };

  it('devrait afficher l\'image du chat', () => {
    render(<CatCard cat={mockCat} onClick={() => {}} />);
    
    const image = screen.getByAltText(/chat/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCat.url);
  });

  it('devrait appeler onClick quand cliqué', () => {
    const handleClick = vi.fn();
    render(<CatCard cat={mockCat} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledWith(mockCat.id);
  });

  it('devrait afficher le texte de vote au survol', () => {
    render(<CatCard cat={mockCat} onClick={() => {}} />);
    
    const overlay = screen.getByText(/cliquez pour voter/i);
    expect(overlay).toBeInTheDocument();
  });
});