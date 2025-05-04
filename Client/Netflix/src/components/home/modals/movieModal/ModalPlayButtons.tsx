import IMovieDetails from "@/api/interfaces/IMovieDetails";
import { Button } from "@/components/ui/button";
import AddToListButton from "@/features/home/AddToListButton";
import { Link } from "react-router-dom";

interface ModalInfoProps {
  movie: IMovieDetails;
  movieTrailer: string | null;
}

const ModalActionsButtons = ({ movie, movieTrailer }: ModalInfoProps) => {
  return (
    <div className="absolute bottom-12 left-5 flex gap-3 items-center ">
      <Button
        asChild
        className="bg-white text-black hover:bg-gray-300 rounded-sm h-10"
      >
        <Link to={movieTrailer ?? ""} target="_blank">
          <img src="/icons/play_icon.png" alt="Play" className="w-5 h-5 mr-2" />
          Play
        </Link>
      </Button>

      <AddToListButton movie={movie} />
    </div>
  );
};

export default ModalActionsButtons;
