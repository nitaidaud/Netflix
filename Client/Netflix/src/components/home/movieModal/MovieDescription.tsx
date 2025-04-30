import IBaseMovie from "@/api/interfaces/IBaseMovie";

interface MovieDescriptionProps {
  movie: IBaseMovie;
}

const MovieDescription = ({ movie }: MovieDescriptionProps) => {
  return (
    <div className="space-y-4 md:w-2/3 w-full">
      <div className="flex items-end gap-4">
        <span className="text-gray-400 text-lg">
          {new Date(movie.release_date).getFullYear()}
        </span>
      </div>
      <p className="text-gray-200 text-lg">
        {movie.overview}
      </p>
    </div>
  );
};

export default MovieDescription;
