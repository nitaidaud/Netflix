import { closeModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";
import { X } from "lucide-react";

const EpisodeLoadingPlaceholder = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="object-cover relative w-[800px] h-full flex flex-col">
      {/* Header placeholder - similar to ModalHeader */}
      <div className="w-full h-[800px] bg-neutral-800 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="h-8 bg-neutral-600 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-neutral-500 rounded w-1/2 mb-4 animate-pulse"></div>
          <div className="h-8 bg-neutral-600 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-neutral-500 rounded w-1/2 mb-4 animate-pulse"></div>
        </div>
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-[100]"
        >
          <X />
        </button>
      </div>

      {/* Season selection placeholder */}
      <div className="w-full p-4 border-b bg-zinc-900 border-white/10 h-full grid items-center">
        <div className="h-20 bg-neutral-700 rounded w-48 animate-pulse"></div>
        <div className="h-20 bg-neutral-700 rounded w-48 animate-pulse"></div>
        <div className="h-20 bg-neutral-700 rounded w-48 animate-pulse"></div>
      </div>
    </div>
  );
};

export default EpisodeLoadingPlaceholder;
