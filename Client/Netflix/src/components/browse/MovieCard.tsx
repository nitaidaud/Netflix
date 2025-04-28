import IBaseMovie from "@/api/interfaces/IBaseMovie";
import AddToListButton from "@/features/home/AddToListButton";

type MovieCardProps = {
  // title?: string;
  // image?: string;
  movie: IBaseMovie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { backdrop_path, title } = movie;
  const image = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : "/images/not-found-img.png";

  return (
    <div className="movie-card relative rounded-md group aspect-video bg-neutral-800 shadow-md overflow-hidden hover:z-30 duration-300 hover:scale-125">
      <div className="w-full aspect-[16/10] bg-neutral-800 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-neutral-500 text-sm">No image</span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 py-2 flex items-end">
        <div className="flex justify-between items-center w-full">
          <p className="text-white text-lg font-semibold line-clamp-2 transition-transform duration-300 group-hover:scale-[1.03] min-w-fit">
            {title}
          </p>
          <AddToListButton movie={movie} />
        </div>
      </div>
      {/* Left: Play + Plus */}
    </div>
  );
}
