import IBaseMovie from "./IBaseMovie";

export default interface IHomeContent {
    newMovies: IBaseMovie[];
    comedy: IBaseMovie[];
    horror: IBaseMovie[];
    action: IBaseMovie[];
    romance: IBaseMovie[];
    kids: IBaseMovie[];
    animation: IBaseMovie[];
    crime: IBaseMovie[];
    documentary: IBaseMovie[];
}