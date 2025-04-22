import { useState } from "react";
import { PlayIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player/youtube";

type MovieCardProps = {
  title: string;
  image: string;
  trailerKey?: string;
  onPlay?: () => void;
  onMoreInfo?: () => void;
};

const HomeMovieCard = ({ title, image, trailerKey, onPlay, onMoreInfo }: MovieCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-md overflow-hidden group aspect-video bg-neutral-800 shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && trailerKey ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          playing
          muted
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      ) : (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {/* Overlay with gradient and buttons */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-bold line-clamp-1 mb-2">
          {title}
        </h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={onPlay}>
            <PlayIcon className="w-4 h-4 mr-1" />
            Play
          </Button>
          <Button size="sm" variant="secondary" onClick={onMoreInfo}>
            <InfoIcon className="w-4 h-4 mr-1" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCard;
