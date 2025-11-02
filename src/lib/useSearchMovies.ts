import { useCallback } from 'react';
import { useBaseMoviesStore } from '@/store/baseMoviesStore';
import { useSearchStore } from '@/store/searchStore';
import performSearch from '@/lib/performSearch';
import type { Movie } from '@/types';

const useSearchMovies = () => {
  const baseMovies = useBaseMoviesStore((state) => state.baseMovies);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);

  const onSearch = useCallback(
    async (query: string) => {
      const results = performSearch(query, baseMovies) as Movie[];
      setSearchResults(results);
      return results;
    },
    [baseMovies]
  );

  return onSearch;
};

export default useSearchMovies;
