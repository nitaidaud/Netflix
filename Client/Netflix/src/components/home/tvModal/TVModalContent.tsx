import { useEffect } from "react";
import { useTVShowById } from "@/hooks/useTVShowById";
import { useSeasonById } from "@/hooks/useSeasonsByTVId";

import ModalHeader from "./ModalHeaderTV";
import ModalSeasons from "./ModalSeasons";
import EpisodeLoadingPlaceholder from "./EpisodeLoadingPlaceholder";

interface Props {
  tvId: number;
  onClose: () => void;
  seasonNumber: number;
}

const TVModalContent = ({ tvId, onClose, seasonNumber }: Props) => {
  const { data: tvShow, isLoading: isTVLoading } = useTVShowById(tvId);
  const { data: season, isLoading: isSeasonLoading } = useSeasonById(
    tvId,
    seasonNumber,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isLoading = isTVLoading || isSeasonLoading || !tvShow || !season;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 rounded-md shadow-xl h-full">
      {/* <div className=" w-full max-w-[800px] min-w-fit bg-zinc-900 rounded-md shadow-xl h-[80vh] scrollbar-hide"> */}
      {isLoading ? (
        <EpisodeLoadingPlaceholder />
      ) : (
        <div className="h-[100%] my-auto max-w-[800px]">
          <ModalHeader tvShow={tvShow} onClose={onClose} />
          <ModalSeasons
            season={season}
            totalSeasons={tvShow.number_of_seasons}
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default TVModalContent;
