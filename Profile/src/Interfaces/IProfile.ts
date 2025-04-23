import IFavoriteList from "./IFavoriteList";
import IProfilePayload from "./IProfilePayload";

export default interface IProfile extends IProfilePayload {
  id: string;
  moviesFavoriteList: IFavoriteList | null;
}
