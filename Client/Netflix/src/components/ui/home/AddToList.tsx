import { Plus } from "lucide-react";
import { Button } from "../button";

type AddToListProps = {
  addToList: () => void;
};

const AddToList = ({ addToList }: AddToListProps) => {
  return (
    <Button
      size="icon"
      className="bg-zinc-500/90 text-white hover:bg-zinc-500/80 rounded-full w-9 h-9"
      onClick={addToList}
    >
      <Plus className="w-5 h-5" />
    </Button>
  );
};

export default AddToList;
