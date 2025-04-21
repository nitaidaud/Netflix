import { inject, injectable } from "inversify";
import IMovie from "../Interfaces/IMovie";
import IProfile from "../Interfaces/IProfile";
import IProfilePayload from "../Interfaces/IProfilePayload";
import IProfileService from "../Interfaces/IProfileService";
import TOKENS from "../../tokens";
import IProfileRepository from "../Interfaces/IProfileRepository";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TOKENS.IProfileRepository)
    private profileRepository: IProfileRepository,
  ) {}

  async getProfileById(profileId: string): Promise<IProfile | null> {
    try {
      const profile = await this.profileRepository.getProfileById(profileId);

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  async createProfile(profileData: IProfilePayload): Promise<IProfile> {
    try {
      const newProfile = await this.profileRepository.createProfile(
        profileData,
      );

      return newProfile;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw new Error("Error creating profile");
    }
  }

  async updateProfile(
    profileId: string,
    profileData: IProfilePayload,
  ): Promise<IProfile | null> {
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
  ): Promise<boolean> {
    try {
      const isAdded = await this.profileRepository.addMovieToFavoriteList(
        profileId,
        movieData,
      );

      if (!isAdded) {
        throw new Error("Error adding movie to favorite list");
      }

      return isAdded;
    } catch (error) {
      console.error("Error adding movie to favorite list:", error);
      return false;
    }
  }

  async removeMovieFromFavoriteList(
    profileId: string,
    movieId: string,
  ): Promise<boolean> {
    try {
      const isRemoved =
        await this.profileRepository.removeMovieFromFavoriteList(
          profileId,
          movieId,
        );

      if (!isRemoved) {
        throw new Error("Error removing movie from favorite list");
      }
      return isRemoved;
    } catch (error) {
      console.error("Error removing movie from favorite list:", error);
      return false;
    }
  }

  async getFavoritesList(profileId: string): Promise<IMovie[] | null> {
    try {
      const profile = await this.profileRepository.getProfileById(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }
      const favoriteList = profile.moviesFavoriteList || [];

      return favoriteList;
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      return null;
    }
  }

  async deleteProfile(profileId: string): Promise<boolean> {
    try {
      const isDeleted = await this.profileRepository.deleteProfile(profileId);

      if (!isDeleted) {
        throw new Error("Error deleting profile");
      }

      return isDeleted;
    } catch (error) {
      console.error("Error deleting profile:", error);
      return false;
    }
  }

  async getAllProfiles(userId: string): Promise<IProfile[] | null> {
    try {
      const profiles = await this.profileRepository.getAllProfiles(userId);
      return profiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return null;
    }
  }
}
