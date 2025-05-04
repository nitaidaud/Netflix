import { useAppDispatch, useAppSelector } from "@/store/store";
import { openTVShowWithSeasonModal } from "@/store/slice/modal.slice";
import EpisodeList from "./EpisodeList";
import SeasonSelect from "./SeasonSelect";
import ISeason from "@/api/interfaces/tv/ISeason";

interface Props {
  season: ISeason;
  totalSeasons: number;
}

const ModalSeasons = ({ season, totalSeasons }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedTVShowId } = useAppSelector((state) => state.modal);

  const handleSeasonChange = (newSeason: number) => {
    if (selectedTVShowId !== null) {
      dispatch(
        openTVShowWithSeasonModal({
          tvId: selectedTVShowId,
          seasonNumber: newSeason,
        }),
      );
    }
  };

  return (
    <div
      className="p-4 space-y-6 h-fit bg-zinc-900 shadow-xl rounded-b-lg"
      key={season.id}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Episodes</h3>
        <SeasonSelect
          totalSeasons={totalSeasons}
          selected={season.season_number}
          onSelect={handleSeasonChange}
        />
      </div>

      <EpisodeList episodes={season.episodes} />
    </div>
  );
};

export default ModalSeasons;
