import fs from "fs";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TOKENS from "../../tokens";
import IMovie from "../Interfaces/IMovie";
import IProfileData from "../Interfaces/IProfilePayload";
import IProfileService from "../Interfaces/IProfileService";
import { handleError } from "../utils/handle-error-request";
import { sign, verify } from "../utils/jwt";
import IProfile from "../Interfaces/IProfile";
import chooseProfileImage from "../utils/profileImage";

@injectable()
export class ProfileController {
  constructor(
    @inject(TOKENS.IProfileService)
    private readonly profileService: IProfileService,
  ) {}

  async login(req: Request, res: Response) {
    try {
      const token: string = req.cookies.Token;
      const profile: IProfile = req.body;

      if (!token || !profile)
        return res.status(401).json({ message: "Unauthorized" });

      const profileToken = await this.profileService.login(profile);

      if (!profileToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.cookie(TOKENS.Token, profileToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;

      if (!profileToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.clearCookie(TOKENS.Token, { httpOnly: true });

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async checkLoggedProfile(req: Request, res: Response) {
    try {
      const token: string = req.cookies.Token;
      const profileToken: string = req.cookies.profileToken;

      if (!token || !profileToken)
        return res.status(401).json({ message: "Unauthorized" });

      const profile = await this.profileService.getProfileByToken(profileToken);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({ message: "Profile found", profile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProfileById(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;
      const profile = await this.profileService.getProfileByToken(profileToken);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({ message: "Profile found", profile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const profileData: IProfileData = req.body;
      const file = req.file;
      const token: string = req.cookies.Token;

      const userPayload = verify(token);
      if (!userPayload)
        return res.status(401).json({ message: "Unauthorized" });

      const imageUrl = chooseProfileImage(file, null);

      const newProfile = await this.profileService.createProfile(
        { ...profileData, image: imageUrl },
        userPayload.id,
      );

      if (!newProfile) {
        return res
          .status(404)
          .json({
            message: "Profile with this name already exists",
            profile: null,
          });
      }

      const { id, ...profile } = newProfile;
      const profileToken = sign({ id });

      res.cookie(TOKENS.Token, profileToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(201).json({ message: "Profile created", profile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;
      const file = req.file;
      const profileData: IProfileData = req.body;

      const ProfilePayload = verify(profileToken);
      if (!ProfilePayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const currentProfile = await this.profileService.getProfileByToken(
        profileToken,
      );

      if (!currentProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const imageUrl = chooseProfileImage(file, currentProfile.image);

      const updatedProfile = await this.profileService.updateProfile(
        ProfilePayload.id,
        { name: profileData.name, image: imageUrl },
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res
        .status(200)
        .json({ message: "Profile updated", profile: updatedProfile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async addMovieToFavoriteList(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;
      const movieData: IMovie = req.body;

      if (!profileToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const profilePayload = verify(profileToken);

      if (!profilePayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const myList = await this.profileService.addMovieToFavoriteList(
        profilePayload.id,
        movieData,
      );

      if (!myList) {
        return res
          .status(404)
          .json({ message: "Profile not found", myList: [] });
      }

      return res
        .status(200)
        .json({ message: "Movie added to favorites", myList });
    } catch (error) {
      handleError(res, error);
    }
  }

  async removeMovieFromFavoriteList(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;
      const movieId: number = req.body.movieId;

      const profilePayload = verify(profileToken);
      if (!profilePayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const myList = await this.profileService.removeMovieFromFavoriteList(
        profilePayload.id,
        movieId,
      );

      if (!myList) {
        return res
          .status(404)
          .json({ message: "Profile not found", myList: [] });
      }

      return res
        .status(200)
        .json({ message: "Movie removed from favorites", myList });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;
      const profileName: string = req.body.name;

      const profilePayload = verify(profileToken);
      if (!profilePayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const isDeleted = await this.profileService.deleteProfile(profileName);

      if (!isDeleted) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.clearCookie(TOKENS.Token, { httpOnly: true });

      return res.status(200).json({ message: "Profile deleted" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFavoriteList(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;

      const profilePayload = verify(profileToken);
      if (!profilePayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const favoritesList = await this.profileService.getFavoritesList(
        profilePayload.id,
      );

      if (!favoritesList || favoritesList.length <= 0) {
        return res
          .status(200)
          .json({ message: "No favorite list", favoritesList });
      }

      return res.status(200).json({ message: "Favorite list", favoritesList });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllProfiles(req: Request, res: Response) {
    try {
      const token: string = req.cookies.Token;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userPayload = verify(token);

      if (!userPayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const profiles = await this.profileService.getAllProfiles(userPayload.id);

      if (!profiles) {
        return res.status(404).json({ message: "No profiles found" });
      }

      return res.status(200).json({ message: "Profiles found", profiles });
    } catch (error) {
      handleError(res, error);
    }
  }
}
