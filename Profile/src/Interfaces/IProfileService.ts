import IMovie from "./IMovie";
import IProfile from "./IProfile";
import IProfilePayload from "./IProfilePayload";

export default interface IProfileService {
  getProfileById(profileId: string): Promise<IProfile | null>;

  createProfile(profileData: IProfilePayload, userId: string): Promise<IProfile>;

  updateProfile(
    profileId: string,
    profileData: IProfilePayload,
  ): Promise<IProfile | null>;

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

  getAllProfiles(userId: string): Promise<IProfile[] | null>;
}
