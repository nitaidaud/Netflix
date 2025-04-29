import IBaseMovie from "@/api/interfaces/IBaseMovie";
import { Categories } from "@/components/browse/categories/browseCategories";

interface MovieGenresProps {
  movie: IBaseMovie;
}

const MovieGenres = ({ movie }: MovieGenresProps) => {
  const { genre_ids } = movie;
  const genreNames = genre_ids?.map((id) => Categories[id]) ?? [];

  return (
    <div className="space-y-4 md:w-1/3 w-full">
      <span className="text-gray-400 text-lg">Genres:</span>
      <div className="text-white">
        {genreNames.length > 0 ? genreNames.join(", ") : "Unknown"}
      </div>
    </div>
  );
};

export default MovieGenres;
