import IBaseMovie from "@/api/interfaces/IBaseMovie";
import { Button } from "@/components/ui/button";
import AddToListButton from "@/features/home/AddToListButton";

interface ModalInfoProps {
  movie: IBaseMovie;
}

const ModalPlayButtons = ({movie}: ModalInfoProps) => {
  return (
    <div className="absolute bottom-32 left-5 flex gap-3 items-center">
      <Button className="bg-white text-black hover:bg-gray-300 rounded-sm h-10">
        <img src="/icons/play_icon.png" alt="Play" className="w-5 h-5 mr-2" />
        Play
      </Button>

      <AddToListButton movie={movie}/>
    </div>
  );
};

export default ModalPlayButtons;
