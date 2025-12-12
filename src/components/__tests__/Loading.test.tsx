import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading/Loading';

describe('Loading', () => {
  it('devrait afficher le spinner de chargement', () => {
    render(<Loading />);

    const spinner = screen.getByLabelText(/chargement/i);
    expect(spinner).toBeInTheDocument();
  });

  it('devrait afficher le texte de chargement', () => {
    render(<Loading />);

    expect(screen.getByText(/chargement des chats/i)).toBeInTheDocument();
  });
});
