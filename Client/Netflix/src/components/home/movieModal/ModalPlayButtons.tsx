import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ModalPlayButtons = () => {
  return (
    <div className="absolute bottom-24 left-6 flex gap-3 items-center">
      <Button className="bg-white text-black hover:bg-gray-300 rounded-sm h-10">
        <img src="/icons/play_icon.png" alt="Play" className="w-5 h-5 mr-2" />
        Play
      </Button>

      <Button className="bg-zinc-600 text-white hover:bg-zinc-500 rounded-full w-10 h-10 flex items-center justify-center">
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ModalPlayButtons;
