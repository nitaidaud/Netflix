import IBaseMovie from "@/api/interfaces/IBaseMovie";
import { Button } from "@/components/ui/button";
import AddToListButton from "@/features/home/AddToListButton";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

type MovieCardProps = {
  movie: IBaseMovie;
  image: string;
  onPlay?: () => void;
  onMoreInfo?: () => void;
};

const HomeMovieCard = ({
  image,
  onPlay,
  movie,
  onMoreInfo,
}: MovieCardProps) => {
  const { title, id } = movie;

  const { data } = useTrailerKey(id);
  const cleanUrl = cleanYouTubeEmbedUrl(data?.embedUrl);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isHovered && cleanUrl) {
      timeout = setTimeout(() => {
        setIsPlaying(true);
      }, 1200); // delay before playing
    } else {
      setIsPlaying(false);
    }

    return () => clearTimeout(timeout);
  }, [isHovered, cleanUrl]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="movie-card relative rounded-md group aspect-video bg-neutral-800 shadow-md overflow-hidden hover:z-30"
    >
      <img
        src={image}
        alt={title}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {cleanUrl && isPlaying && (
        <ReactPlayer
          playing
          volume={0.2}
          url={cleanUrl}
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-white text-lg font-bold line-clamp-1 mb-1">
          {title}
        </h3>
        <div className="flex justify-between items-center w-full">
          {/* Left: Play + Plus */}
          <div className="flex gap-2">
            <Button
              size="icon"
              className="bg-white text-black hover:bg-zinc-400 rounded-full w-9 h-9"
              onClick={onPlay}
            >
              <img src="/icons/play_icon.png" alt="Play" className="w-4 h-4" />
            </Button>

            <AddToListButton movie={movie} />
          </div>

          {/* Right: More Info */}
          <Button
            size="sm"
            variant="ghost"
            className="bg-gray-500/30 text-white hover:bg-zinc-600/80 hover:text-white rounded-sm"
            onClick={onMoreInfo}
          >
            <InfoIcon className="w-4 h-4 mr-1" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCard;
