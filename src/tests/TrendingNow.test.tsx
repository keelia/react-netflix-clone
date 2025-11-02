import TrendingNow from '@/components/TrendingNow';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

const movies = [
  { id: 1, title: 'Inception1', poster_path: null },
  { id: 2, title: 'Inception2', poster_path: null },
  { id: 3, title: 'inception3', poster_path: null },
];

vi.mock('@/components/MovieList', () => {
  return {
    default: (props: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'mock-movie-list' },
        props.movies.map((movie: any) =>
          React.createElement(
            'div',
            { key: movie.id },
            `MovieList ${movie.title}`
          )
        )
      ),
  };
});

describe('TrendingNow Component', () => {
  test('render title', () => {
    const { getByText } = render(<TrendingNow movies={[]} />);
    expect(getByText('Trending Now')).toBeInTheDocument();
  });

  test('render empty list if no movies', () => {
    const { getByTestId } = render(<TrendingNow movies={[]} />);
    expect(getByTestId('mock-movie-list')).toBeInTheDocument();
    expect(getByTestId('mock-movie-list').textContent).toBe('');
  });

  test('render list of movies', () => {
    const { getByTestId } = render(<TrendingNow movies={movies as any} />);
    expect(getByTestId('mock-movie-list')).toBeInTheDocument();
    expect(getByTestId('mock-movie-list').textContent).toContain(
      'MovieList Inception1'
    );
    expect(getByTestId('mock-movie-list').textContent).toContain(
      'MovieList Inception2'
    );
    expect(getByTestId('mock-movie-list').textContent).toContain(
      'MovieList inception3'
    );
  });
});
