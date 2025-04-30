import IBaseMovie from "./IBaseMovie";
import IGenre from "./IGenre";

export default interface IMovieDetails extends IBaseMovie {
    genres: IGenre[];
}