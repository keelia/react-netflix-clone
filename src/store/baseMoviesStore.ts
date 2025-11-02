import { create } from 'zustand';
import type { Movie } from '@/types';

type MoviesState = {
  baseMovies: Movie[];
  setBaseMovies: (res: Movie[]) => void;
};

export const useBaseMoviesStore = create<MoviesState>((set) => ({
  baseMovies: [],
  setBaseMovies: (res: Movie[]) => set({ baseMovies: res }),
}));
