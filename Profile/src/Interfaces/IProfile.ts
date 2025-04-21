import IProfilePayload from "./IProfilePayload";
import IMovie from "./IMovie";

export default interface IProfile extends IProfilePayload {
  moviesFavoriteList: IMovie[];
}
