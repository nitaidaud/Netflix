import { Button } from "@/components/ui/button";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { InfoIcon, PlayIcon } from "lucide-react";
import { useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() => setIsPlaying(false)} className="movie-card relative rounded-md  group aspect-video bg-neutral-800 shadow-md hover:scale-105">
      {data?.embedUrl && (
        <>
          <ReactPlayer
            playing={isPlaying}
            url={cleanUrl}
            width="100%"
            height="100%"
            className="trailer size-full"
          />

          <div className="movie-actions bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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
        </>
      )}

      <img
        src={image}
        alt={title}
        className="movie-poster w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay with gradient and buttons */}
    </div>
  );
};

export default HomeMovieCard;
