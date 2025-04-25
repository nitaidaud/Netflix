import { InfoIcon, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";

type HeroSectionProps = {
  title: string;
  overview: string;
  backdropPath: string;
};

const HeroSection = ({ title, overview, backdropPath }: HeroSectionProps) => {
  return (
    <div
      className="relative w-full h-[75vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent px-8 py-10 flex flex-col justify-end">
        <h1 className="text-white text-4xl font-bold mb-2">{title}</h1>
        <p className="text-white text-sm max-w-xl mb-4 line-clamp-3">
          {overview}
        </p>
        <div className="flex gap-3">
          <Button className="bg-white text-black font-semibold hover:bg-zinc-400 h-9.5">
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
          >
            <InfoIcon className="w-4 h-4" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
