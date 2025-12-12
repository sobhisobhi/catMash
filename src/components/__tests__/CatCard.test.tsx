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

  it("devrait afficher l'image du chat", () => {
    const handleClick = vi.fn();
    render(<CatCard cat={mockCat} onClick={handleClick} />);

    const image = screen.getByAltText(/chat mignon/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCat.url);
  });

  it("devrait appeler onClick avec l'id du chat quand cliqué", () => {
    const handleClick = vi.fn();
    render(<CatCard cat={mockCat} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(mockCat.id);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('devrait afficher le texte de vote', () => {
    const handleClick = vi.fn();
    render(<CatCard cat={mockCat} onClick={handleClick} />);

    expect(screen.getByText(/cliquez pour voter/i)).toBeInTheDocument();
  });

  it("devrait avoir l'attribut aria-label", () => {
    const handleClick = vi.fn();
    render(<CatCard cat={mockCat} onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Voter pour ce chat');
  });
});
