import IFavoriteList from "./IFavoriteList";

export default interface IProfile {
  name: string;
  image: string | null;
  moviesFavoriteList: IFavoriteList | null;
}
