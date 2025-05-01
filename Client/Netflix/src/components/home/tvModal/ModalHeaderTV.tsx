import ITVShow from "@/api/interfaces/ITVShow";
import { X } from "lucide-react";

interface Props {
  tvShow: ITVShow;
  onClose: () => void;
}

const ModalHeader = ({ tvShow, onClose }: Props) => {
  const {
    backdrop_path,
    name,
    number_of_seasons,
    overview,
    first_air_date,
    genres,
  } = tvShow;

  const year = parseInt(first_air_date.slice(0, 4), 10);

  return (
    <div className="relative  h-[450px] w-full overflow-hidden">
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : "/images/not-found-img.png"
        }
        alt={name}
        className="w-full h-full object-cover "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-800/70 to-transparent" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-[100]"
      >
        <X />
      </button>

      <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-start flex-wrap gap-6">
        {/* Left side */}
        <div className="max-w-2xl ">
          <h2 className="text-4xl font-bold">{name}</h2>
          <p className="text-lg text-zinc-400 flex gap-2 mt-1">
            <span>{number_of_seasons} Seasons</span>
            <span>{year}</span>
          </p>
          <p className="mt-3 text-base max-w-xl">{overview}</p>
        </div>
        
        {/* Right side */}
        <div className="self-start">
          <div className="flex mt-20 mr-90 items-center">
            <p className="text-md text-zinc-400 mr-2">Genres:</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 text-sm px-2 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default ModalHeader;