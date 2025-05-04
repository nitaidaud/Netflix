import ProfileDTO from "../DTOs/profile.dto";
import ICreateProfile from "./ICreateProfile";
import IFavoriteList from "./IFavoriteList";
import IMovie from "./IMovie";
import IProfile from "./IProfile";
import IProfileData from "./IProfilePayload";

export default interface IProfileService {
  getProfileByToken(profileToken: string): Promise<ProfileDTO>;

  createProfile(profileData: ICreateProfile, token: string): Promise<ProfileDTO>;

  updateProfile(
    profileToken: string,
    profileData: ICreateProfile,
  ): Promise<ProfileDTO>;

  login(profileData: IProfile): Promise<string>;

  addMovieToFavoriteList(
    profileToken: string,
    movieData: IMovie,
  ): Promise<IFavoriteList>;

  removeMovieFromFavoriteList(
    profileToken: string,
    movieId: number,
  ): Promise<IFavoriteList>;

  getFavoritesList(profileToken: string): Promise<IMovie[]>;

  deleteProfile(profileName: string): Promise<boolean>;

  getAllProfiles(userToken: string): Promise<ProfileDTO[]>;
}
