import type { Movie, TMDBResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

type InfiniteMoviesResult = {
  movies: Movie[];
  loading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

async function fetchMovies(page: number, token: string): Promise<TMDBResponse> {
  const res = await fetch(`${API_URL}&page=${page}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data: TMDBResponse = await res.json();
  return data;
}

const useInfiniteMovies = (): InfiniteMoviesResult => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['infiniteMovies'],
    queryFn: async ({ pageParam = 1 }): Promise<TMDBResponse> => {
      if (!token) {
        return {
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0,
        };
      }
      return fetchMovies(pageParam, token);
    },
    getNextPageParam: (lastPage: TMDBResponse) => {
      if (!lastPage) {
        return undefined;
      }
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages ? next : undefined;
    },
    initialPageParam: 1,
  });

  const movies = data ? data.pages.flatMap((page) => page.results) : [];

  if (status === 'pending') {
    return {
      movies: [],
      loading: true,
      error: null,
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }
  if (status === 'error') {
    return {
      movies: [],
      loading: false,
      error: error as Error,
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }

  return {
    movies,
    loading: isFetching && !isFetchingNextPage,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  };
};

export default useInfiniteMovies;
