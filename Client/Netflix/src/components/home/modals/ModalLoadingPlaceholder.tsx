import { closeModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";
import { X } from "lucide-react";

const placeHolderArray = Array.from({ length: 5 }, (_, i) => i);

const ModalLoadingPlaceholder = () => {
  const dispatch = useAppDispatch();
  return (
    // <div className="object-cover relative w-full h-full flex flex-col">
    <>
      <div className="h-full my-auto w-full bg-neutral-800 grid items-center">
        <div className="relative bg-gradient-to-t from-zinc-900 to-transparent h-full w-full row-span-12 grid">
          <div className=" h-[80%] my-auto left-0 p-6 w-full flex flex-col justify-between">
            {placeHolderArray.map((i) => (
              <div className="h-1/4" key={i}>
                <div className="h-8 bg-neutral-600 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-neutral-500 rounded w-1/2 mb-4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-[100]"
        >
          <X />
        </button>

        <div className="w-full p-4 bg-zinc-900 h-full grid gap-5 items-center">
          {placeHolderArray.map(
            (i) =>
              i < 3 && (
                <div
                  key={i}
                  className="h-25 bg-neutral-700 rounded w-48 animate-pulse"
                />
              ),
          )}
        </div>
      </div>
    </>
    // </div>
  );
};

export default ModalLoadingPlaceholder;
