import Hero from './components/Hero';
import TrendingNow from './components/TrendingNow';
import './App.css';

import useInfiniteMovies from './lib/useInfiniteMovies';

function App() {
  // const [movies, error, loading] = usePopularMovies();
  const {
    movies,
    error,
    loading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteMovies();

  if (loading) {
    return <div className="h-[calc(100vh-48px)] text-red-500">Loading...</div>;
  }
  if (error) {
    return (
      <div className="h-[calc(100vh-48px)] text-red-500">
        Error: {typeof error === 'string' ? error : error?.message}
      </div>
    );
  }
  if (!movies?.length) {
    return (
      <div className="h-[calc(100vh-48px)] text-red-500">
        No movies were found
      </div>
    );
  }
  return (
    <main className="h-[calc(100vh-48px)]">
      <Hero />
      <div className="container mx-auto mt-6 max-w-6xl px-6">
        <TrendingNow
          movies={movies}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
          loadMore={fetchNextPage}
        />
      </div>
      <TrendingNow
        movies={movies}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        loadMore={fetchNextPage}
      />
    </main>
  );
}

export default App;
