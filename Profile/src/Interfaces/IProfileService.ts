import ProfileDTO from "../DTOs/profile.dto";
import IMovie from "./IMovie";
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
  ): Promise<boolean>;

  removeMovieFromFavoriteList(
    profileId: string,
    movieId: string,
  ): Promise<boolean>;

  getFavoritesList(profileId: string): Promise<IMovie[] | null>;

  deleteProfile(profileId: string): Promise<boolean>;

  getAllProfiles(userId: string): Promise<ProfileDTO[] | null>;
}
