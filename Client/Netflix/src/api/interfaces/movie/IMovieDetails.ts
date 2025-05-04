
import IGenre from "../IGenre";
import IBaseMovie from "./IBaseMovie";


export default interface IMovieDetails extends IBaseMovie {
    genres: IGenre[];
}