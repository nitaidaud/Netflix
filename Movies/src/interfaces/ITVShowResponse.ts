import IBaseResponse from "./IBaseResponse";
import ITVShow from "./ITVShow";

export default interface ITVShowResponse extends IBaseResponse {
    results: ITVShow[];
}