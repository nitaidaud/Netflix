import IBaseMovie from "@/api/interfaces/movie/IBaseMovie";
import LoadingContentAnimation from "../shared/LoadingContentAnimation";
import MovieCard from "../shared/MovieCard";

type MoviesGridProps = {
  movies: IBaseMovie[];
  isLoading: boolean;
  onMoreInfo: (id: number, type: "Movie" | "Show") => void;
  lastMovieRef?: (node?: Element | null) => void; // Added ref parameter
};

const MoviesGrid = ({ movies, isLoading, onMoreInfo, lastMovieRef }: MoviesGridProps) => {
  return (
    <div className="p-4 mt-6">
      {isLoading ? (
        <LoadingContentAnimation />
      ) : movies.length === 0 ? (
        <p className="text-center text-white">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((item, index) => {
            const { backdrop_path, id, type } = item;
            // Check if this is the last movie in the array
            const isLastMovie = index === movies.length - 1;
            
            return (
              <div 
                key={id}
                ref={isLastMovie ? lastMovieRef : undefined} // Apply ref to last movie wrapper
              >
                <MovieCard
                  movie={item}
                  image={
                    backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                      : "/images/not-found-img.png"
                  }
                  onMoreInfo={() => onMoreInfo(id, type)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;