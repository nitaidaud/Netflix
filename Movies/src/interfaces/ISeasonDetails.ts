export default interface ISeasonDetails {
    id: number;
    name: string;
    overview: string;
    season_number: number;
    air_date: string;
    poster_path: string;
    episodes: {
      id: number;
      name: string;
      episode_number: number;
      overview: string;
      still_path: string | null;
      air_date: string;
      vote_average: number;
    }[];
  }