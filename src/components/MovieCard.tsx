import { Card } from '@/components/ui/card';
import type { MovieCardProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, order, children }: MovieCardProps) => {
  return (
    <div className="relative">
      {movie ? (
        <Link
          to="/watch/$movieId"
          params={{ movieId: String(movie.id) }}
          aria-label={`Open details for ${movie.title}`}
        >
          <Card
            className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200
    p-0 border-0 w-[7em] h-[9.8em] rounded-sm"
          >
            <img
              loading="lazy"
              src={
                movie.poster_path
                  ? TMDB_IMG_URL + movie.poster_path
                  : '/placeholder.svg'
              }
              alt={`${movie.title} poster` || 'Movie Poster'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10"
            />
          </Card>
        </Link>
      ) : (
        <Card
          className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200
    p-0 border-0 w-[7em] h-[9.8em] rounded-sm"
        >
          {children}
        </Card>
      )}
      {order && (
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
