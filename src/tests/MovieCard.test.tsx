import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import MovieCard from '@/components/MovieCard';
import type { Movie } from '@/types';
import React from 'react';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/inception.jpg',
};

//Mock the Card component used inside MovieCard so tests don't need patch-mapping.
vi.mock('@/components/ui/card', () => {
  return {
    Card: (props: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'mock-card', onClick: props.onClick },
        props.children
      ),
  };
});

describe('MovieCard Component', () => {
  test('renders without crash', () => {
    const { getByTestId } = render(<MovieCard movie={mockMovie} order={1} />);
    expect(getByTestId('mock-card')).toBeInTheDocument();
  });

  test('renders poster and is clickable', () => {
    render(<MovieCard movie={mockMovie} order={1} />);
    const posterElement = screen.getByAltText(/Inception poster/i);
    expect(posterElement).toBeInTheDocument();
    expect(posterElement).toHaveAttribute(
      'src',
      expect.stringContaining('/inception.jpg')
    );
    const buttonElement = screen.getByRole('button', {
      name: /open details for inception/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });
});
