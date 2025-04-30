import IBaseMovie from "@/api/interfaces/IBaseMovie";

interface MovieGenresProps {
  movie: IBaseMovie;
}

const MovieGenres = ({ movie }: MovieGenresProps) => {
  const { genre_ids } = movie;

  // מיפוי מקומי של מזהי ז'אנר לשם באנגלית
  const localGenreMap: Record<number, string> = {
    28: "Action",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    27: "Horror",
    10751: "Kids",
    10749: "Romance",
    0: "Top", // אם אתה מתייג סרטים עם קטגוריה פנימית כלשהי כמו 'Top'
  };

  
  const genreNames =
    genre_ids
      ?.map((id) => localGenreMap[id])
      .filter((name): name is string => Boolean(name)) ?? [];

      console.log("genre_ids", genre_ids);

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
