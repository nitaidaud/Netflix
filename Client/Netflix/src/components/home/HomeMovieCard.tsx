import { Button } from "@/components/ui/button";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { InfoIcon, PlayIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

type MovieCardProps = {
  id: number;
  title: string;
  image: string;
  trailerKey?: string;
  onPlay?: () => void;
  onMoreInfo?: () => void;
};

const HomeMovieCard = ({
  title,
  image,
  onPlay,
  id,
  onMoreInfo,
}: MovieCardProps) => {
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
        <div className="flex gap-2 items-center">
          <Button size="sm" onClick={onPlay}>
            <PlayIcon className="w-4 h-4 mr-1" />
            Play
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="bg-gray-500/30 text-white hover:bg-gray-500/40 rounded-sm"
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
