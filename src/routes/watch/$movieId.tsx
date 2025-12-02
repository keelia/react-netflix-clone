import VideoPlayer from '@/components/VideoPlayer';
import type { Movie } from '@/types';
import { createFileRoute } from '@tanstack/react-router';

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
  return (
    <div className="px-4 text-white">
      <h1 className="py-2 text-2xl">{movieDetails.title}</h1>
      <p className="mb-4">{movieDetails.overview}</p>
      <VideoPlayer movie={movieDetails} />;
    </div>
  );
}
