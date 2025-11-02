import type { Movie } from '@/types';

const performSearch = (q: string, baseMovies: Movie[]) => {
  const qTrim = q.trim();
  if (qTrim === '') {
    return [];
  }
  const filteredMovies: Movie[] = baseMovies.filter((movie: Movie) =>
    movie.title.toLowerCase().includes(qTrim.toLowerCase())
  );
  return filteredMovies;
};
export default performSearch;
