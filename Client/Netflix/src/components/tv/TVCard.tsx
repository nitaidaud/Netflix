import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

import ITVShow from "@/api/interfaces/ITVShow";
import AddToListButton from "@/features/home/AddToListButton";

interface Props {
  show: ITVShow;
  image: string;
  onMoreInfo: () => void;
}

const TVCard = ({ show, image, onMoreInfo }: Props) => {
  const { id, name } = show;
  // const { data } = useTrailerKey(id,"tv" );
  // const cleanUrl = cleanYouTubeEmbedUrl(data?.embedUrl);

  // const [isHovered, setIsHovered] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   if (isHovered && cleanUrl) {
  //     timeout = setTimeout(() => setIsPlaying(true), 1200);
  //   } else {
  //     setIsPlaying(false);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [isHovered, cleanUrl]);

  return (
    <div
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      className="movie-card relative rounded-md group aspect-video bg-neutral-800 shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={image}
        alt={name}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 
          `}
      />

      {/* {cleanUrl && isPlaying && (
        <ReactPlayer
          playing
          volume={0.2}
          muted
          url={cleanUrl}
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />
      )} */}

      <div className="absolute inset-0 mt-auto h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-300 flex-col justify-end p-3">
        <h3 className="text-white text-lg font-bold line-clamp-1 mb-1">
          {name}
        </h3>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <Button
              size="icon"
              className="bg-white text-black hover:bg-zinc-400 rounded-full w-9 h-9"
              onClick={() => console.log("Play", id)}
            >
              <img src="/icons/play_icon.png" alt="Play" className="w-4 h-4" />
            </Button>

            <AddToListButton tvShow={show} />
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="bg-gray-500/30 text-white hover:bg-zinc-600/80 hover:text-white rounded-sm"
            onClick={onMoreInfo}
          >
            <InfoIcon className="w-4 h-4 mr-1" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;
