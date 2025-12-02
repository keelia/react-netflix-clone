import type { Movie, MovieListProps } from '../types';
import MovieCard from './MovieCard';
import { SignedIn } from '@clerk/clerk-react';
import useInfiniteLoad from '@/lib/useInfiniteLoad';
import usehPRorizontalScroll from '@/lib/useHorizontalScroll';

const MovieList = ({
  movies,
  hasMore,
  loadMore,
  isLoadingMore,
}: MovieListProps) => {
  const { containerRef, sentinelRef } = useInfiniteLoad(loadMore, {
    threshold: 0.1,
  });
  usehPRorizontalScroll(containerRef);
  return (
    <ul
      className="flex overflow-x-scroll space-x-4 px-16 relative 
      no-scrollbar"
      aria-label="Movie List"
      ref={containerRef}
    >
      {movies.map((movie: Movie, index: number) => (
        <li key={movie.id}>
          <MovieCard movie={movie} order={index + 1} />
        </li>
      ))}
      <SignedIn>
        <li key={'nextMovie'} ref={sentinelRef}>
          <MovieCard>
            <div className="bg-gray-300/70 flex items-center justify-center w-full h-full">
              <span className="text-white text-center">
                {isLoadingMore
                  ? 'Loading more...'
                  : hasMore
                    ? 'Load More'
                    : 'Nothing More to load'}
              </span>
            </div>
          </MovieCard>
        </li>
      </SignedIn>
    </ul>
  );
};

export default MovieList;
