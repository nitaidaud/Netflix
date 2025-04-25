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
  ): Promise<IProfile> {
    try {
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
      throw new Error("Error creating profile");
    }
  }

  async login(profileData: IProfile): Promise<string | null> {
    try {
      const { id } = profileData;
      console.log("profileData", profileData);
      console.log("profileId", id);

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
