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
  console.log("tvShow", tvShow);

  const { data: season } = useSeasonById(tvId, seasonNumber);
  console.log("season", season);

  if (!tvShow || !season) return null;

  return (
    <div className="fixed inset-0 z-50 grid overflow-y-auto items-center justify-center bg-black/80 px-4 py-8 max-h-[50vh] m-auto w-fit">
      <div className="relative w-full max-w-6xl bg-zinc-900 rounded-md shadow-xl">
        <ModalHeader tvShow={tvShow} onClose={onClose} />
        <ModalSeasons season={season} />
      </div>
    </div>
  );
};

export default TVModalContent;
