import IEpisode from "@/api/interfaces/IEpisode";

interface Props {
  episodes: IEpisode[];
}

const EpisodeList = ({ episodes }: Props) => {
  return (
    <ul className="grid  text-white overflow-y-auto h-full max-h-fit">
      {episodes.map((ep) => (
        <li
          className="flex gap-4 items-center py-4 hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer border-b border-white/10"
          key={ep.id}
        >
          <div className="w-6 text-lg flex justify-center">
            {ep.episode_number}
          </div>

          <div className="relative min-w-[160px] max-w-[160px] h-[90px] bg-black rounded-sm overflow-hidden group">
            <img
              src={
                ep.still_path
                  ? `https://image.tmdb.org/t/p/original${ep.still_path}`
                  : "/images/not-found-img.png"
              }
              alt={ep.name}
              className="w-full h-full object-cover rounded-sm"
            />

            <img
              src="/icons/white_play_icon.png"
              alt="Pl"
              className="absolute inset-0 m-auto w-21 h-21 opacity-0  group-hover:opacity-100 transition-opacity duration-200"
            />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-sm">{ep.name}</p>
              <span className="text-xs font-semibold text-zinc-300">
                {ep.runtime}m
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {ep.overview}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
