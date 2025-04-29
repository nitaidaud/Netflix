import IBaseMovie from "@/api/interfaces/IBaseMovie";
import MovieDescription from "./MovieDescription";
import MovieGenres from "./MovieGenres";

interface ModalInfoProps {
  movie: IBaseMovie;
}

const ModalInfo = ({ movie }: ModalInfoProps) => {
  return (
    <div className="p-6 bg-zinc-900 z-20 flex flex-col md:flex-row gap-8">
      {/* צד ימין - תיאור הסרט */}

      <MovieDescription movie={movie} />

      {/* צד שמאל - ז'אנרים */}

      <MovieGenres movie={movie} />
    </div>
  );
};

export default ModalInfo;
