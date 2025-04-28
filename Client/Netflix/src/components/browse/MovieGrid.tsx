import IBaseMovie from "@/api/interfaces/IBaseMovie";

import LoadingContentAnimation from "../shared/LoadingContentAnimation";
import MovieCard from "../shared/MovieCard";

type MoviesGridProps = {
  movies: IBaseMovie[];
  isLoading: boolean;
  onMoreInfo: (id: number) => void; // 👈 ADD this prop
};

const MoviesGrid = ({ movies, isLoading, onMoreInfo }: MoviesGridProps) => {
  return (
    <div className="p-4 mt-6">
      {isLoading ? (
        <LoadingContentAnimation />
      ) : movies.length === 0 ? (
        <p className="text-center text-white">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
          {movies.map((movie) => {
            const { backdrop_path, id } = movie;
            return (
              <MovieCard
                key={id}
                movie={movie}
                image={
                  backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                    : "/images/not-found-img.png"
                }
                onMoreInfo={() => onMoreInfo(id)} // 👈 CALL onMoreInfo correctly
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;
