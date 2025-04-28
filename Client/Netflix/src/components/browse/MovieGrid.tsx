import IBaseMovie from "@/api/interfaces/IBaseMovie";
import MovieCard from "./MovieCard";
import LoadingContentAnimation from "../shared/LoadingContentAnimation";

type MoviesGridProps = {
  movies: IBaseMovie[];
  isLoading: boolean;
};

const MoviesGrid = ({ movies, isLoading }: MoviesGridProps) => {
  console.log("MoviesGrid", movies);
  return (
    <div className="p-4 mt-6">
      {isLoading ? (
        <LoadingContentAnimation />
      ) : (
        //todo: dispaly no movies found if movies is empty
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 gap-y-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              // title={movie.title}
              // image={
              //   movie.backdrop_path
              //     ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              //     : "/images/not-found-img.png"
              // }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;
