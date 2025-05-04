import { closeModal } from "@/store/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TVModalContent from "./TVModalContent";

const TVModal = () => {
  const { selectedTVShowId, selectedSeasonNumber } = useAppSelector(
    (state) => state.modal,
  );
  const dispatch = useAppDispatch();
  
  if (!selectedTVShowId) return null;

  return (
    <TVModalContent
      tvId={selectedTVShowId}
      seasonNumber={selectedSeasonNumber}
      onClose={() => dispatch(closeModal())}
    />
  );
};

export default TVModal;
