import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { openMovieModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";
import { InfoIcon } from "lucide-react";

type HeroContentProps = {
  title: string;
  overview: string;
  onPlay: () => void;
  id: number;
};

const HeroContent = ({ title, overview, onPlay, id }: HeroContentProps) => {
  const dispatch = useAppDispatch();
  const handleMoreInfo = () => {
    dispatch(openMovieModal(id));
  };
  return (
    <div className="absolute inset-x-0 bottom-0 top-[0%] md:top-0 md:inset-0 bg-gradient-to-t from-black via-black/20 to-transparent px-4 md:px-10 py-10 md:py-15 flex flex-col justify-end z-10 text-left">
      <Typography
        responsiveSize={{ base: "text-3xl", md: "text-5xl", lg: "text-6xl" }}
        weight="font-bold"
        className="mb-4"
      >
        {title}
      </Typography>
      <Typography
        responsiveSize={{ base: "text-sm", md: "text-base", lg: "text-lg" }}
        className="max-w-xl mb-6 line-clamp-3"
      >
        {overview}
      </Typography>
      <div className="flex flex-wrap justify-start gap-3">
        <Button
          className="bg-white text-black font-semibold hover:bg-zinc-400 h-9.5"
          onClick={onPlay}
        >
          <img
            src="/icons/play_icon.png"
            alt="Play"
            className="w-4 h-4 mr-0.5"
          />
          Play
        </Button>
        <Button
          variant="ghost"
          className="bg-gray-600/20 text-white hover:bg-gray-500/30 hover:text-white rounded-sm h-10"
          onClick={handleMoreInfo}
        >
          <InfoIcon className="w-4 h-4" />
          More Info
        </Button>
      </div>
    </div>
  );
};
export default HeroContent;
