import type { Movie } from '@/types';

type VideoPlayerProps = {
  movie: Movie;
};

const VideoPlayer = ({ movie }: VideoPlayerProps) => {
  console.log('Rendering VideoPlayer for movie:', movie);
  return (
    <div className="px-4 text-white">
      <h1 className="py-2 text-2xl">{movie.title}</h1>
      <p className="mb-4">{movie.overview}</p>
      <video
        controls
        autoPlay
        className="w-full max-h-[80vh] bg-black"
        poster={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : undefined
        }
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/webm"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
