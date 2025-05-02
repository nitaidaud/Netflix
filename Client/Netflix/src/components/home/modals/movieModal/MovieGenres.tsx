import IMovieDetails from "@/api/interfaces/IMovieDetails";

interface MovieGenresProps {
  movie: IMovieDetails;
}

const MovieGenres = ({ movie }: MovieGenresProps) => {
  const { genres } = movie;

  return (
    <div className="space-y-4 md:w-1/3 w-full">
      <span className="text-zinc-500 text-lg">Genres:</span>
      <div className="text-white">
        {genres.length > 0 ? genres.map((genre)=>{
          return (
            <span
              key={genre.id}
              className="bg-gray-800 text-gray-300 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {genre.name}
            </span>
          );
        }) : "Unknown"}
      </div>
    </div>
  );
};

export default MovieGenres;
