import type { Movie } from '@/types';
import { useLayoutEffect, useRef } from 'react';

type VideoPlayerProps = {
  movie: Movie;
};

const VideoPlayer = ({ movie }: VideoPlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  useLayoutEffect(() => {
    const videoRef = ref.current;
    return () => {
      if (videoRef) {
        videoRef.pause();
      }
    };
  }, []);
  return (
    <video
      ref={ref}
      controls
      autoPlay={false}
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
