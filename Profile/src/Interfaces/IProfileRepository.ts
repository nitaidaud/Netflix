import IProfilePayload from "./IProfilePayload";
import IProfile from "./IProfile";
import IMovie from "./IMovie";

export default interface IProfileRepository {
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
  deleteProfile(profileId: string): Promise<boolean>;
  getAllProfiles(userId: string): Promise<IProfile[] | null>;
}
