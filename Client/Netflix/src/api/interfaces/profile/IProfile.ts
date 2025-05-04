import IFavoriteList from "../movie/IFavoriteList";
import IProfileData from "./IProfileData";


export default interface IProfile extends IProfileData {
  favoriteList: IFavoriteList | null;
}
