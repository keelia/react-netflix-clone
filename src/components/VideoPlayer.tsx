import type { Movie } from '@/types';

type VideoPlayerProps = {
  movie: Movie;
};

const VideoPlayer = ({ movie }: VideoPlayerProps) => {
  return (
    <video
      controls
      autoPlay
      className="w-full max-h-[80vh] border border-amber-100 rounded-md bg-black"
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
  );
};

export default VideoPlayer;
