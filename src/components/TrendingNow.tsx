import type { Movie } from '@/types';
import MovieList from './MovieList';

type TrendingNowProps = {
  movies: Movie[];
  loadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
};

const TrendingNow = ({
  movies,
  hasMore,
  loadMore,
  isLoadingMore,
}: TrendingNowProps) => {
  return (
    <>
      <h3 className="py-2 font-medium lg:text-2xl sm:text-xl">Trending Now</h3>
      <div className="mx-auto my-4">
        <MovieList
          movies={movies}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      </div>
    </>
  );
};

export default TrendingNow;
