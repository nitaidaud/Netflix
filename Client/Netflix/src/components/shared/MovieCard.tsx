import IBaseMovie from "@/api/interfaces/movie/IBaseMovie";
import { Button } from "@/components/ui/button";
import AddToListButton from "@/features/home/AddToListButton";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: IBaseMovie;
  image: string;
  onMoreInfo?: () => void;
  showTrailerOnHover?: boolean;
};

const MovieCard = ({
  movie,
  image,
  onMoreInfo,
  showTrailerOnHover = true,
}: MovieCardProps) => {
  const { title, id } = movie;

  const { data } = useTrailerKey(id, "movie");
  const cleanUrl = cleanYouTubeEmbedUrl(data?.embedUrl);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isHovered && cleanUrl && showTrailerOnHover && !isMobile) {
      timeout = setTimeout(() => {
        setIsPlaying(true);
      }, 1200);
    } else {
      setIsPlaying(false);
    }

    return () => clearTimeout(timeout);
  }, [isHovered, cleanUrl, showTrailerOnHover, isMobile]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (isMobile && onMoreInfo) onMoreInfo();
      }}
      className="movie-card relative rounded-md group aspect-video bg-neutral-800 shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 rounded-md ${
          isPlaying ? "opacity-0" : "opacity-100"
        } sm:aspect-video aspect-[2/3] object-center`}
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

      {!isMobile && (
        <div className="absolute inset-0 mt-auto h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-300 flex-col justify-end p-3">
          <h3 className="text-white text-base sm:text-lg font-bold line-clamp-1 mb-1">
            {title}
          </h3>

          <div className="flex justify-between items-center w-full flex-wrap gap-2">
            <div className="flex gap-2">
              {!cleanUrl ? (
                <Button
                  size="icon"
                  className="bg-white text-black hover:bg-zinc-400 rounded-full w-9 h-9"
                >
                  <img
                    src="/icons/play_icon.png"
                    alt="Play"
                    className="w-4 h-4"
                  />
                </Button>
              ) : (
                <Link to={cleanUrl} target="_blank">
                  <Button
                    size="icon"
                    className="bg-white text-black hover:bg-zinc-400 rounded-full w-9 h-9"
                  >
                    <img
                      src="/icons/play_icon.png"
                      alt="Play"
                      className="w-4 h-4"
                    />
                  </Button>
                </Link>
              )}

              <AddToListButton movie={movie} />
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="bg-gray-500/30 text-white hover:bg-zinc-600/80 hover:text-white rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo?.();
              }}
            >
              <InfoIcon className="w-4 h-4 mr-1" />
              More Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
