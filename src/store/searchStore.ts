import { create } from 'zustand';
import type { Movie } from '@/types';

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 500;

type SearchState = {
  query: string;
  searchResult: Movie[];
  baseMovies: Movie[];
  setQuery: (q: string) => void;
  setSearchResults: (res: Movie[]) => void;
  setBaseMovies: (res: Movie[]) => void;
  performSearch: (q: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  searchResult: [],
  baseMovies: [],
  setQuery: (q: string) => set({ query: q }),
  setSearchResults: (res: Movie[]) => set({ searchResult: res }),
  setBaseMovies: (res: Movie[]) => set({ baseMovies: res }),
  performSearch: (q: string) => {
    //update query immediately so UI can reflect the current text
    set({ query: q });

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const qTrim = q.trim();
    if (qTrim === '') {
      set({ searchResult: [] });
      return;
    }
    debounceTimer = setTimeout(() => {
      set((state) => {
        const filteredMovies: Movie[] = state.searchResult.filter(
          (movie: Movie) => movie.title.toLowerCase().includes(q.toLowerCase())
        );
        return { searchResult: filteredMovies };
      });
    }, DEBOUNCE_MS);
  },
}));
