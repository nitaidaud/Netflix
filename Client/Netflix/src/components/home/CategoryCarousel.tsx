import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { Link } from "react-router-dom";
import HomeMovieCard from "./HomeMovieCard";

interface CategoryCarouselProps {
  title: string;
  movies: any[];
  categoryLink: string;
}

const CategoryCarousel = ({ title, movies, categoryLink }: CategoryCarouselProps) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <Link to={categoryLink} className="text-blue-400 text-sm hover:underline">
          Show all
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {movies.slice(0, 10).map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/5">
              <HomeMovieCard
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;