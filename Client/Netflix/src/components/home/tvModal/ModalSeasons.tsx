import ISeason from "@/api/interfaces/ISeason";
import EpisodeList from "./EpisodeList";

interface Props {
  season: ISeason;
}

const ModalSeasons = ({ season }: Props) => {
  return (
    <div className="p-4 space-y-6">
      <div key={season.id}>
        <h3 className="text-xl font-semibold text-white mb-2">{season.name}</h3>
        <EpisodeList episodes={season.episodes} />
      </div>
    </div>
  );
};

export default ModalSeasons;
