import IBaseMovie from "@/api/interfaces/movie/IBaseMovie";
import MovieCard from "@/components/shared/MovieCard";
import { openMovieModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";

interface CarouselMovieCardProps {
  movie: IBaseMovie;
}

const CarouselMovieCard = ({ movie }: CarouselMovieCardProps) => {
  const dispatch = useAppDispatch();
  const { id, backdrop_path } = movie;

  return (
    <MovieCard
      movie={movie}
      image={
        backdrop_path
          ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
          : "/images/not-found-img.png"
      }
      onMoreInfo={() => dispatch(openMovieModal(id))}
    />
  );
};

export default CarouselMovieCard;
