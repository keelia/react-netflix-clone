import { createFileRoute } from '@tanstack/react-router';
import MovieCard from '@/components/MovieCard';
import type { Movie, TMDBResponse } from '@/types';
import performSearch from '@/lib/performSearch';

type MovieSearch = {
  movie?: string;
};

const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

export const Route = createFileRoute('/search')({
  component: SearchComponent,
  validateSearch: (search: Record<string, unknown>): MovieSearch => {
    // validate and parse the search params into a typed state
    return {
      movie: (search.movie as string) || '',
    };
  },
  loader: async ({ abortController }) => {
    // you can perform data loading here based on the search params
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal,
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch movies: ${res.statusText}`);
      }
      const data: TMDBResponse = await res.json();
      return {
        baseMovies: data.results ?? [],
      };
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        throw new Error(`Failed to fetch movies: ${error}`);
      }
    }
  },
});

function SearchComponent() {
  const { movie } = Route.useSearch();
  const { baseMovies } = Route.useLoaderData() as { baseMovies: Movie[] };
  const searchResult = performSearch(movie || '', baseMovies);
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-6">
        Search Results for "{movie}"
      </h2>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {movie
          ? `Showing ${searchResult.length} results for ${movie}`
          : 'No search query provided'}
      </div>
      {searchResult?.length > 0 ? (
        <div className="mt-8 grid gap-6">
          {searchResult.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        'No results found'
      )}
    </div>
  );
}
