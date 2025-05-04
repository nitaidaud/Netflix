import IEpisode from "./IEpisode";

export default interface ISeason {
  id: number;
  air_date: string | null;
  episode_count: number;
  name: string;
  poster_path: string | null;
  season_number: number;
  episodes: IEpisode[];
}
