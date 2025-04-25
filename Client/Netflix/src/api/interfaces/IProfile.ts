import IBaseMovie from "./IBaseMovie";
import IProfileData from "./IProfileData";

export default interface IProfile extends IProfileData {
  moviesFavoriteList: IBaseMovie[] | null;
}
