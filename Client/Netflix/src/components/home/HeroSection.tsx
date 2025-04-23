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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent px-8 py-10 flex flex-col justify-end">
        <h1 className="text-white text-4xl font-bold mb-2">{title}</h1>
        <p className="text-white text-sm max-w-xl mb-4 line-clamp-3">
          {overview}
        </p>
        <div className="flex gap-3">
          <Button className="bg-white text-black font-semibold">Play</Button>
          <Button variant="outline" className="text-white border-white">
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
