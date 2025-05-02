import IFavoriteList from "./IFavoriteList";
import IProfileData from "./IProfileData";

export default interface IProfile extends IProfileData {
  favoriteList: IFavoriteList | null;
}
