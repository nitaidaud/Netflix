import { inject, injectable } from "inversify";
import TOKENS from "../../tokens";
import IMovie from "../Interfaces/IMovie";
import IProfile from "../Interfaces/IProfile";
import IProfileData from "../Interfaces/IProfilePayload";
import IProfileRepository from "../Interfaces/IProfileRepository";
import IProfileService from "../Interfaces/IProfileService";
import ProfileDTO from "../DTOs/profile.dto";
import { sign, verify } from "../utils/jwt";
import IProfilePayload from "../Interfaces/IUserPayload";
import IMyListRemoveMovie from "../Interfaces/IMylistRemoveMovie";
import IFavoriteList from "../Interfaces/IFavoriteList";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TOKENS.IProfileRepository)
    private profileRepository: IProfileRepository,
  ) {}

  async getProfileByToken(profileToken: string): Promise<ProfileDTO | null> {
    try {
      const profilePayload = verify(profileToken);
      if (!profilePayload) {
        throw new Error("Invalid token");
      }

      const { id } = profilePayload;
      const profile = await this.profileRepository.getProfileById(id);

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  async createProfile(
    profileData: IProfileData,
    userId: string,
  ): Promise<IProfile | null> {
    try {
      const userExist = !!(await this.profileRepository.getProfileByName(
        profileData.name,
      ));

      if (userExist) return null;

      const newProfile = await this.profileRepository.createProfile(
        profileData,
        userId,
      );

      if (!newProfile) {
        throw new Error("Error creating profile");
      }

      return newProfile;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw new Error(`Error creating profile: ${error}`);
    }
  }

  async login(profileData: IProfile): Promise<string | null> {
    try {
      const { id } = profileData;

      const profileToken = sign({ id });

      return profileToken;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  }

  async updateProfile(
    profileId: string,
    profileData: IProfileData,
  ): Promise<ProfileDTO | null> {
    try {
      const updatedProfile = await this.profileRepository.updateProfile(
        profileId,
        profileData,
      );
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Error updating profile");
    }
  }

  async addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<IFavoriteList> {
    try {
      const myList = await this.profileRepository.addMovieToFavoriteList(
        profileId,
        movieData,
      );

      if (!myList) {
        throw new Error("Error adding movie to favorite list");
      }

      return myList;
    } catch (error) {
      console.error("Error adding movie to favorite list:", error);
      const myList = await this.profileRepository.getMyList(profileId);

      if (!myList) {
        throw new Error("Error removing movie from favorite list");
      }

      return myList;
    }
  }

  async removeMovieFromFavoriteList(
    profileId: string,
    movieId: number,
  ): Promise<IFavoriteList> {
    try {
      const myList = await this.profileRepository.removeMovieFromFavoriteList(
        profileId,
        movieId,
      );

      if (!myList) {
        throw new Error("Error removing movie from favorite list");
      }
      return myList;
    } catch (error) {
      console.error("Error removing movie from favorite list:", error);
      const myList = await this.profileRepository.getMyList(profileId);

      if (!myList) {
        throw new Error("Error removing movie from favorite list");
      }

      return myList;
    }
  }

  async getFavoritesList(profileId: string): Promise<IMovie[] | null> {
    try {
      const profile = await this.profileRepository.getProfileById(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }

      const favList = profile.moviesFavoriteList;
      if (!favList) {
        throw new Error("Favorite list not found");
      }

      return favList.movies;
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      return null;
    }
  }

  async deleteProfile(profileName: string): Promise<boolean> {
    try {
      const isDeleted = await this.profileRepository.deleteProfile(profileName);

      if (!isDeleted) {
        throw new Error("Error deleting profile");
      }

      return isDeleted;
    } catch (error) {
      console.error("Error deleting profile:", error);
      return false;
    }
  }

  async getAllProfiles(userId: string): Promise<ProfileDTO[] | null> {
    try {
      const profiles = await this.profileRepository.getAllProfiles(userId);
      return profiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return null;
    }
  }
}
