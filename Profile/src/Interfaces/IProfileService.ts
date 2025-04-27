import ProfileDTO from "../DTOs/profile.dto";
import IFavoriteList from "./IFavoriteList";
import IMovie from "./IMovie";
import IMyListRemoveMovie from "./IMylistRemoveMovie";
import IProfile from "./IProfile";
import IProfileData from "./IProfilePayload";

export default interface IProfileService {
  getProfileByToken(profileToken: string): Promise<ProfileDTO | null>;

  createProfile(profileData: IProfileData, userId: string): Promise<IProfile>;

  updateProfile(
    profileId: string,
    profileData: IProfileData,
  ): Promise<ProfileDTO | null>;

  login(profileData: IProfile): Promise<string | null>;

  addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<IFavoriteList>;

  removeMovieFromFavoriteList(
    profileId: string,
    movieId: number,
  ): Promise<IFavoriteList>;

  getFavoritesList(profileId: string): Promise<IMovie[] | null>;

  deleteProfile(profileId: string): Promise<boolean>;

  getAllProfiles(userId: string): Promise<ProfileDTO[] | null>;
}
