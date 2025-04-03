import IBaseMovie from "./IBaseMovie";

export default interface IBaseResponse {
    page: number;
    results: IBaseMovie[];
    total_pages: number;
    total_results: number;
}