import IMovie from "./IMovie";

export default interface IFavoriteList {
    id: string;
    movies: IMovie[];
    profileId: string;
}