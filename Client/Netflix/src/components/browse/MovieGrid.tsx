import MovieCard from "./MovieCard";

type MoviesGridProps = {
  movies: any[];
  isLoading: boolean;
};

const MoviesGrid = ({ movies, isLoading }: MoviesGridProps) => {
  return (
    <div className="p-4 mt-6">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 gap-y-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full aspect-[16/10] bg-neutral-700 animate-pulse rounded-sm"
          />
        ))}
      </div>
      
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 gap-y-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;

