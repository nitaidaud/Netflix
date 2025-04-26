import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Link } from "react-router-dom";
import HomeMovieCard from "./HomeMovieCard";
import IBaseMovie from "@/api/interfaces/IBaseMovie";

interface CategoryCarouselProps {
  title: string;
  movies: IBaseMovie[];
  categoryLink: string;
  onMoreInfo: (id: number) => void;
}

const CategoryCarousel = ({
  title,
  movies,
  categoryLink,
  onMoreInfo,
}: CategoryCarouselProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center px-2 mb-4">
        <div className="group flex items-center gap-3 px-2 mb-4">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <Link
            to={categoryLink}
            className="text-cyan-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:underline"
          >
            Show all &gt;
          </Link>
        </div>
      </div>
      <Carousel
        className="relative px-20 overflow-x-clip"
        opts={{ align: "start", loop: false }}
      >
        <CarouselContent className="overflow-visible z-10 hover:shadow-2xlִִִ hover:shadow-black">
          {movies.slice(0, 10).map((movie) => (
            <CarouselItem
              key={movie.id}
              className="relative md:basis-1/2 lg:basis-1/5 transition-transform duration-300 hover:z-30 hover:scale-130 "
            >
              <HomeMovieCard
                movie={movie}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                onPlay={() => console.log("Play", movie.title)}
                onMoreInfo={() => onMoreInfo(movie.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-50" />
        <CarouselNext className="right-0 z-50" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
