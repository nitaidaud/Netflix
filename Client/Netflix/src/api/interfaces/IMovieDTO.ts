import IBaseMovie from "./IBaseMovie";

export default interface IMovieDTO extends IBaseMovie {
  genre_ids: number[];
}
