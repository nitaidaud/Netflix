import IBaseMovie from "./IBaseMovie";
import IBaseResponse from "./IBaseResponse";

export default interface IMovieResponse extends IBaseResponse {
    results: IBaseMovie[];
}