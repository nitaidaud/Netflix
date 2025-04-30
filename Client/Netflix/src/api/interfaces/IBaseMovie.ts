import IGenre from "./IGenre";

export default interface IBaseMovie {
  id: number;
  title: string;
  release_date: string;
  genres: IGenre[];
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  popularity: number;
  adult: boolean;
}
