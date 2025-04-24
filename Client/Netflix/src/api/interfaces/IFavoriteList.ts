import IBaseMovie from "./IBaseMovie";

export default interface IFavoriteList {
    id: string;
    movies: IBaseMovie[];
    profileId: string;
}