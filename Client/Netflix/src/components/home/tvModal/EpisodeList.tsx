import IEpisode from "@/api/interfaces/IEpisode";

interface Props {
  episodes: IEpisode[];
}

const EpisodeList = ({ episodes }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-4 text-white overflow-y-auto max-h-[50vh]">
      {episodes.map((ep) => (
        <li key={ep.id} className="bg-zinc-800 rounded-md p-3">
          <p className="font-semibold">{ep.episode_number}. {ep.name}</p>
          <p className="text-sm">{ep.runtime} min • {ep.air_date}</p>
          <p className="text-xs mt-1 text-zinc-400 line-clamp-2">{ep.overview}</p>
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
