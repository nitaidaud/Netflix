import { Minus } from "lucide-react";
import { Button } from "../button";

type AddToListProps = {
  removeFromList: () => void;
};

const RemoveFromList = ({ removeFromList }: AddToListProps) => {
  return (
    <Button
      size="icon"
      className="bg-zinc-500/90 text-white hover:bg-zinc-500/80 rounded-full w-9 h-9"
      onClick={removeFromList}
    >
      <Minus className="w-5 h-5" />
    </Button>
  );
};

export default RemoveFromList;
