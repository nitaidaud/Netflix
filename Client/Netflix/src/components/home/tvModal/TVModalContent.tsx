import { useSeasonById } from "@/hooks/useSeasonsByTVId";
import ModalHeader from "./ModalHeaderTV";
import ModalSeasons from "./ModalSeasons";
import { useTVShowById } from "@/hooks/useTVShowById";

interface Props {
  tvId: number;
  onClose: () => void;
  seasonNumber: number;
}

const TVModalContent = ({ tvId, onClose, seasonNumber }: Props) => {
  const { data: tvShow } = useTVShowById(tvId);
  const { data: season } = useSeasonById(tvId, seasonNumber);

  if (!tvShow || !season) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
      <div className="relative w-full max-w-6xl bg-zinc-900 rounded-md overflow-hidden shadow-xl">
        <ModalHeader tvShow={tvShow} onClose={onClose} />
        <ModalSeasons seasons={tvShow.seasons} />
      </div>
    </div>
  );
};

export default TVModalContent;

