import IBaseMovie from "./IBaseMovie";

export default interface IBaseResponse {
    page: number;
    
    total_pages: number;
    total_results: number;
}