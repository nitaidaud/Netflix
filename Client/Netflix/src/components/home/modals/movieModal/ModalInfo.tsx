import IMovieDetails from "@/api/interfaces/movie/IMovieDetails";
import MovieDescription from "./MovieDescription";
import MovieGenres from "./MovieGenres";

interface ModalInfoProps {
  movie: IMovieDetails;
}

const ModalInfo = ({ movie }: ModalInfoProps) => {
  return (
    <div className="px-4 py-6 bg-zinc-900 flex flex-col md:flex-row gap-6">

      <MovieDescription movie={movie} />

      <MovieGenres movie={movie} />
    </div>
  );
};

export default ModalInfo;
