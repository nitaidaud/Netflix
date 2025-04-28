import IBaseMovie from "./IBaseMovie";

export default interface IMoviesByPageResponse {
  results: IBaseMovie[];
  totalPages: number;
}
