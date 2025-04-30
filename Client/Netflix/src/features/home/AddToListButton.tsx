import IBaseMovie from "@/api/interfaces/IBaseMovie";
import AddToList from "@/components/ui/home/AddToList";
import RemoveFromList from "@/components/ui/home/RemoveFromList";
import {
  addMovieToFavoriteList,
  removeMovieFromFavoriteList,
} from "@/store/slice/profile.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { LucideLoader } from "lucide-react";
import { useState } from "react";

type AddToListButtonProps = {
  movie: IBaseMovie;
};

const AddToListButton = ({ movie }: AddToListButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList,
  );
  const dispatch = useAppDispatch();

  const isMovieAdded = myList?.movies.some((m) => m.id === movie.id);

  const addToList = async () => {
    try {
      setIsLoading(true);
      const movieToAdd: IBaseMovie = {
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        id: movie.id,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        adult: movie.adult,
      };

      await dispatch(addMovieToFavoriteList(movieToAdd));
    } catch (error) {
      console.error("Error adding movie to list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromList = async () => {
    try {
      setIsLoading(true);
      await dispatch(removeMovieFromFavoriteList(movie.id));
    } catch (error) {
      console.error("Error removing movie from list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LucideLoader className="animate-spin my-auto" />
  ) : isMovieAdded ? (
    <RemoveFromList removeFromList={removeFromList} />
  ) : (
    <AddToList addToList={addToList} />
  );
};

export default AddToListButton;
