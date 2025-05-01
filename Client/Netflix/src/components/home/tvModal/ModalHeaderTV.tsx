import ITVShow from "@/api/interfaces/ITVShow";
import { X } from "lucide-react";

interface Props {
  tvShow: ITVShow;
  onClose: () => void;
}

const ModalHeader = ({ tvShow, onClose }: Props) => {
  const { backdrop_path, name, first_air_date, number_of_seasons, overview } =
    tvShow;
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : "/images/not-found-img.png"
        }
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-800/70 to-transparent" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
      >
        <X />
      </button>
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-sm">
          {first_air_date} • {number_of_seasons} Seasons
        </p>
        <p className="mt-2 text-sm max-w-xl">{overview}</p>
      </div>
    </div>
  );
};

export default ModalHeader;
