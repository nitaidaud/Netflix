import IProfileData from "./IProfilePayload";
import IProfile from "./IProfile";
import IMovie from "./IMovie";
import ProfileDTO from "../DTOs/profile.dto";

export default interface IProfileRepository {
  getProfileById(profileId: string): Promise<ProfileDTO | null>;
  createProfile(profileData: IProfileData, userId: string): Promise<IProfile>;
  updateProfile(
    profileId: string,
    profileData: IProfileData,
  ): Promise<ProfileDTO | null>;
  addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<boolean>;
  removeMovieFromFavoriteList(
    profileId: string,
    movieId: number,
  ): Promise<boolean>;
  deleteProfile(profileId: string): Promise<boolean>;
  getAllProfiles(userId: string): Promise<ProfileDTO[] | null>;
}
