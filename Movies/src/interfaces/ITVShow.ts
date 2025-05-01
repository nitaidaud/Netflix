import IGenre from "./IGenre";
import ISeason from "./ISeason";


export default interface ITVShow {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genres: IGenre[];
  name: string;
  number_of_seasons: number;
  overview: string;
  poster_path: string | null;
  seasons: ISeason[];
}
