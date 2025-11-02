import { useBaseMoviesStore } from '@/store/baseMoviesStore';
import type { Movie, TMDBResponse } from '@/types';
import { useEffect, useState } from 'react';

const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

type UsePopularMoviesResult = [Movie[], Error | string | null, boolean];

const usePopularMovies = (): UsePopularMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);

  const setBaseMovies = useBaseMoviesStore((state) => state.setBaseMovies);

  useEffect(() => {
    const abort = new AbortController();
    const fetchTrendingMovies = async () => {
      if (!token) {
        setError('Missing VITE_TMDB_AUTH_TOKEN env variable');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: abort.signal,
        });
        if (!res.ok) {
          throw new Error();
        }
        const data: TMDBResponse = await res.json();
        console.log('Trending Movies Data: ', data);
        setMovies(data.results ?? []);
        setBaseMovies(data.results ?? []);
        setError(null);
        if (!abort.signal.aborted) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        if (!abort.signal.aborted) {
          setError(error as Error);
          setLoading(false);
        }
      }
    };
    fetchTrendingMovies();
    return () => abort.abort();
  }, []);

  return [movies, error, loading];
};

export default usePopularMovies;
