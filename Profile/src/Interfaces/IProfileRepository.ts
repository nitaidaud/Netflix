import IProfileData from "./IProfilePayload";
import IProfile from "./IProfile";
import IMovie from "./IMovie";
import ProfileDTO from "../DTOs/profile.dto";
import IMyListRemoveMovie from "./IMylistRemoveMovie";
import IFavoriteList from "./IFavoriteList";

export default interface IProfileRepository {
  getProfileById(profileId: string): Promise<ProfileDTO | null>;
  getProfileByName(profileName: string): Promise<ProfileDTO | null>;
  createProfile(profileData: IProfileData, userId: string): Promise<IProfile>;
  updateProfile(
    profileId: string,
    profileData: IProfileData,
  ): Promise<ProfileDTO | null>;
  addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<IFavoriteList>;
  removeMovieFromFavoriteList(
    profileId: string,
    movieId: number,
  ): Promise<IFavoriteList>;
  getMyList(profileId: string): Promise<IFavoriteList | null>;
  deleteProfile(profileName: string): Promise<boolean>;
  getAllProfiles(userId: string): Promise<ProfileDTO[] | null>;
}
