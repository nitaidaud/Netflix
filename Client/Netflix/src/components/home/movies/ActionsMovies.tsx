import IBaseMovie from "@/api/interfaces/IBaseMovie";

type ActionsMoviesProps = {
  movies: IBaseMovie[];
};

const ActionsMovies = ({ movies }: ActionsMoviesProps) => {
  console.log("movies", movies);

  return (
    <div className="grid grid-cols-6 h-full mt-32 gap-5">
      {movies.map((movie) => {
        const posterImg = `https://images.tmdb.org/t/p/w500${movie.poster_path}`;
        return (
          <div key={movie.id} className="">
            <img
              width={150}
              height={100}
              src={posterImg || "/not-found-video-img"}
              alt={movie.title + " image"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActionsMovies;
