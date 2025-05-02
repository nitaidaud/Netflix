import IBaseMovie from "@/api/interfaces/IBaseMovie";
import ITVShow from "@/api/interfaces/ITVShow";
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
  movie?: IBaseMovie;
  tvShow?: ITVShow;
};

const AddToListButton = ({ movie, tvShow }: AddToListButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const myList = useAppSelector((state) => state.profile.profile?.favoriteList);
  const dispatch = useAppDispatch();

  const isMovieAdded = myList?.favoriteList.some(
    (m) => m.id === movie?.id || m.id === tvShow?.id,
  );

  const addToList = async () => {
    try {
      setIsLoading(true);
      if (movie) {
        const movieToAdd: IBaseMovie = {
          backdrop_path: movie.backdrop_path,
          id: movie.id,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
          adult: movie.adult,
          type: "Movie",
        };

        await dispatch(addMovieToFavoriteList(movieToAdd));
      }

      if (tvShow) {
        const tvShowToAdd: IBaseMovie = {
          backdrop_path: tvShow.backdrop_path,
          id: tvShow.id,
          overview: tvShow.overview,
          popularity: tvShow.popularity,
          poster_path: tvShow.poster_path,
          release_date: tvShow.first_air_date,
          title: tvShow.name,
          adult: tvShow.adult,
          type: "Show",
        };

        await dispatch(addMovieToFavoriteList(tvShowToAdd));
      }
    } catch (error) {
      console.error("Error adding movie to list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromList = async () => {
    try {
      setIsLoading(true);
      if (movie) {
        await dispatch(removeMovieFromFavoriteList(movie.id));
      }

      if (tvShow) {
        await dispatch(removeMovieFromFavoriteList(tvShow.id));
      }
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
