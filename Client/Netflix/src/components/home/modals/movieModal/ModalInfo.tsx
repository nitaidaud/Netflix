import IMovieDetails from "@/api/interfaces/IMovieDetails";
import MovieDescription from "./MovieDescription";
import MovieGenres from "./MovieGenres";

interface ModalInfoProps {
  movie: IMovieDetails;
}

const ModalInfo = ({ movie }: ModalInfoProps) => {
  return (
    <div className="p-6 bg-zinc-900 z-20 flex flex-col md:flex-row gap-8">
      <MovieDescription movie={movie} />

      <MovieGenres movie={movie} />
    </div>
  );
};

export default ModalInfo;
