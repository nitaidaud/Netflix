import IBaseMovie from "@/api/interfaces/movie/IBaseMovie";
import Typography from "@/components/shared/Typography";


interface MovieDescriptionProps {
  movie: IBaseMovie;
}

const MovieDescription = ({ movie }: MovieDescriptionProps) => {
  return (
    <div className="space-y-4 md:w-2/3 w-full">
      <div className="flex items-end gap-4">
        <Typography
          responsiveSize={{
            base: "text-sm",
            sm: "text-base",
            md: "text-lg",
          }}
          color="text-zinc-400"
        >
          {new Date(movie.release_date).getFullYear()}
        </Typography>
      </div>
      <Typography
        responsiveSize={{
          base: "text-sm",
          sm: "text-base",
          md: "text-lg",
        }}
        color="text-gray-200"
      >
        {movie.overview}
      </Typography>
    </div>
  );
};

export default MovieDescription;
