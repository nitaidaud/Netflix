import IBaseMovie from "./IBaseMovie";

export default interface IMoviesByPage {
  totalPages: number;
  results: IBaseMovie[];
}
