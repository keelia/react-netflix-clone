import VideoPlayer from '@/components/VideoPlayer';
import type { Movie } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { startTransition, useState, ViewTransition } from 'react';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

async function fetchMovieDetails(movieId: string): Promise<Movie> {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export const Route = createFileRoute('/watch/$movieId')({
  component: RouteComponent,
  loader: async ({ params }) => fetchMovieDetails(params.movieId),
});

function RouteComponent() {
  const movieDetails = Route.useLoaderData() as Movie;
  const [isWatching, setIsWatching] = useState(false);
  const handleWatchToggle = () => {
    startTransition(() => {
      setIsWatching(!isWatching);
    });
  };
  return (
    <div className="px-4 text-white flex flex-col gap-16">
      <div className="flex flex-row gap-4">
        <span className="flex-1">
          <img
            loading="lazy"
            src={
              movieDetails.poster_path
                ? TMDB_IMG_URL + movieDetails.poster_path
                : '/placeholder.svg'
            }
            alt={`${movieDetails.title} poster` || 'Movie Poster'}
            className={`
              w-full h-full object-cover transition-opacity duration-300
            `}
          />
        </span>
        <span className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl text-center">{movieDetails.title}</h1>
          <dl>
            <dt>Rate:</dt>
            <dd>
              {`${movieDetails.vote_average} (${movieDetails.vote_count})`}
            </dd>
          </dl>
          <p className="mb-4">{movieDetails.overview}</p>
          <button
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-amber-700 transition"
            onClick={handleWatchToggle}
          >
            {isWatching ? 'Stop Watching' : '+ Watch Movie'}
          </button>
        </span>
      </div>
      {isWatching && (
        <ViewTransition enter="scale-in">
          <div className="flex-1">
            <VideoPlayer movie={movieDetails} />
          </div>
        </ViewTransition>
      )}
    </div>
  );
}
