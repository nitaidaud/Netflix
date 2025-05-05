import { inject, injectable } from "inversify";
import TOKENS from "../../tokens";
import ProfileDTO from "../DTOs/profile.dto";
import ICreateProfile from "../Interfaces/ICreateProfile";
import IFavoriteList from "../Interfaces/IFavoriteList";
import IMovie from "../Interfaces/IMovie";
import IProfile from "../Interfaces/IProfile";
import IProfileRepository from "../Interfaces/IProfileRepository";
import IProfileService from "../Interfaces/IProfileService";
import { sign, verify } from "../utils/jwt";
import chooseProfileImage from "../utils/profileImage";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TOKENS.IProfileRepository)
    private profileRepository: IProfileRepository,
  ) {}

  async getProfileByToken(profileToken: string): Promise<ProfileDTO> {
    try {
      const profilePayload = verify(profileToken);
      if (!profilePayload) {
        throw new Error("Unauthorized");
      }

      const { id } = profilePayload;
      const profile = await this.profileRepository.getProfileById(id);

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }

  async createProfile(
    profileData: ICreateProfile,
    token: string,
  ): Promise<ProfileDTO> {
    try {
      const userPayload = verify(token);

      if (!userPayload) {
        throw new Error("Unauthorized");
      }

      const { image, name } = profileData;

      const profileExist = !!(await this.profileRepository.getProfileByName(name));

      if (profileExist) {
        throw new Error("Profile with this name already exists");
      }

      const { id: userId } = userPayload;

      const imageUrl = chooseProfileImage(image, null);

      const newProfile = await this.profileRepository.createProfile(
        {
          name,
          image: imageUrl,
        },
        userId,
      );

      if (!newProfile) {
        throw new Error("Error creating profile");
      }

      const profileToken = sign({ id: newProfile.id });

      return {
        ...newProfile,
        token: profileToken,
      };
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  async login(profileData: IProfile): Promise<string> {
    try {
      const { id } = profileData;

      const profileToken = sign({ id });

      return profileToken;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async updateProfile(
    profileToken: string,
    profileData: ICreateProfile,
  ): Promise<ProfileDTO> {
    try {
      const profilePayload = verify(profileToken);

      if (!profilePayload) {
        throw new Error("Unauthorized");
      }

      const { image, name } = profileData;

      const { id: profileId } = profilePayload;

      const userExist = !!(await this.profileRepository.getProfileById(
        profileId,
      ));

      if (!userExist) {
        throw new Error("Profile does not exist");
      }

      const imageUrl = chooseProfileImage(image, name);

      const updatedProfile = await this.profileRepository.updateProfile(
        profileId,
        {
          name,
          image: imageUrl,
        },
      );

      if (!updatedProfile) {
        throw new Error("Error updating profile");
      }

      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  async addMovieToFavoriteList(
    profileToken: string,
    movieData: IMovie,
  ): Promise<IFavoriteList> {
    try {
      const profilePayload = verify(profileToken);

      if (!profilePayload) {
        throw new Error("Unauthorized");
      }

      const { id: profileId } = profilePayload;

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

      const myList = await this.profileRepository.getMyList(profileToken);

      if (!myList) {
        throw new Error("Error removing movie from favorite list");
      }

      return myList;
    }
  }

  async removeMovieFromFavoriteList(
    profileToken: string,
    movieId: number,
  ): Promise<IFavoriteList> {
    try {
      const profilePayload = verify(profileToken);

      if (!profilePayload) {
        throw new Error("Unauthorized");
      }

      const { id: profileId } = profilePayload;

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
      const myList = await this.profileRepository.getMyList(profileToken);

      if (!myList) {
        throw new Error("Error removing movie from favorite list");
      }

      return myList;
    }
  }

  async getFavoritesList(profileToken: string): Promise<IMovie[]> {
    try {
      const profilePayload = verify(profileToken);

      if (!profilePayload) {
        throw new Error("Unauthorized");
      }

      const { id: profileId } = profilePayload;

      const profile = await this.profileRepository.getProfileById(profileId);

      if (!profile) {
        throw new Error("Profile not found");
      }

      const favList = profile.favoriteList;
      if (!favList || favList.favoriteList.length <= 0) {
        throw new Error("Favorite list not found");
      }

      return favList.favoriteList;
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      throw error;
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
      throw error;
    }
  }

  async getAllProfiles(userToken: string): Promise<ProfileDTO[]> {
    try {
      const userPayload = verify(userToken);

      if (!userPayload) {
        throw new Error("Unauthorized");
      }

      const { id: userId } = userPayload;

      const profiles = await this.profileRepository.getAllProfiles(userId);

      if (!profiles || profiles.length <= 0) {
        throw new Error("No profiles found!");
      }

      return profiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      throw error;
    }
  }
}
