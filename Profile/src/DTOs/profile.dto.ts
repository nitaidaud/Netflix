import IFavoriteList from "../Interfaces/IFavoriteList";
import IProfileData from "../Interfaces/IProfilePayload";

export default interface ProfileDTO extends IProfileData {
  favoriteList: IFavoriteList | null;
}
