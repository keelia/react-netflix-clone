import { Card } from '@/components/ui/card';
import type { MovieCardProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, order }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onClick = () => {
    console.log('MovieCard clicked:', movie);
    navigate({
      to: '/watch/$movieId',
      params: { movieId: String(movie?.id) },
    });
  };

  console.log('Rendering MovieCard for movie:', isHovered, order, movie);
  return (
    <div className="relative h-[9.8em] w-[7em]">
      {movie && (
        <Card
          className={`
            group relative cursor-pointer p-0 border-0 rounded-sm
            transition-all duration-300 ease-in-out
            w-[7em] h-[9.8em]
          `}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          {isHovered && (
            <div
              className="absolute inset-0 flex items-center justify-center z-50 shadow-2xl w-[200%] h-[200%] 
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={onClick}
            >
              <VideoPlayer movie={movie} />
            </div>
          )}
          <img
            loading="lazy"
            src={
              movie.poster_path
                ? TMDB_IMG_URL + movie.poster_path
                : '/placeholder.svg'
            }
            alt={`${movie.title} poster` || 'Movie Poster'}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${isHovered ? 'opacity-0' : 'opacity-100'} 
            `}
          />
        </Card>
      )}
      {order && !isHovered && (
        <Badge
          className="absolute bottom-2 -left-6 text-5xl z-20 rounded-full bg-transparent text-neutral-900 
      text-shadow-[1px_1px_0_#9ca3af,-1px_1px_0_#9ca3af,-1px_-1px_0_#9ca3af,1px_-1px_0_#9ca3af]"
        >
          {order}
        </Badge>
      )}
    </div>
  );
};

export default MovieCard;
