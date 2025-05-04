import { useAppDispatch, useAppSelector } from "@/store/store";
import MovieModalContent from "./MovieModalContent";
import { closeModal } from "@/store/slice/modal.slice";

const MovieModal = () => {
  const { selectedMovieId } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  if (!selectedMovieId) return null;

  return (
    <MovieModalContent
      movieId={selectedMovieId}
      onClose={() => dispatch(closeModal())}
    />
  );
};

export default MovieModal;
