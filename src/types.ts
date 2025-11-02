import type { UIEventHandler } from 'react';

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
};

export type MovieListProps = {
  movies: Movie[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadMore?: () => void;
  onScroll?: UIEventHandler<HTMLUListElement>;
};

export type MovieCardProps = {
  movie?: Movie;
  order?: number;
  children?: React.ReactNode;
};

export type TMDBResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};
