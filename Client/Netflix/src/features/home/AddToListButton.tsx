import IBaseMovie from "@/api/interfaces/IBaseMovie";
import AddToList from "@/components/ui/home/AddToList";
import { addMovieToFavoriteList } from "@/store/slice/profile.slice";
import { useAppDispatch } from "@/store/store";
import { LucideLoader } from "lucide-react";
import { useState } from "react";

type AddToListButtonProps = {
  movie: IBaseMovie;
};

const AddToListButton = ({ movie }: AddToListButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const addToList = async () => {
    try {
      setIsLoading(true);
      await dispatch(addMovieToFavoriteList(movie));
    } catch (error) {
      console.error("Error adding movie to list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LucideLoader className="animate-spin" />
  ) : (
    <AddToList addToList={addToList} />
  );
};

export default AddToListButton;
