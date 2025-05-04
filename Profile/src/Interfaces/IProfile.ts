import IFavoriteList from "./IFavoriteList";
import IProfileData from "./IProfilePayload";

export default interface IProfile extends IProfileData {
  id: string;
  favoriteList: IFavoriteList | null;
}
