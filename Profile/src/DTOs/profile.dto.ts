import IFavoriteList from "../Interfaces/IFavoriteList";
import IProfileData from "../Interfaces/IProfilePayload";

export default interface ProfileDTO extends IProfileData {
  moviesFavoriteList: IFavoriteList | null;
}
