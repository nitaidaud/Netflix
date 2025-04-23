import { inject, injectable } from "inversify";
import TOKENS from "../../tokens";
import IProfileService from "../Interfaces/IProfileService";
import { Request, Response } from "express";
import { handleError } from "../utils/handle-error-request";
import IProfilePayload from "../Interfaces/IProfilePayload";
import IMovie from "../Interfaces/IMovie";
import { verify } from "../utils/jwt";

@injectable()
export class ProfileController {
  constructor(
    @inject(TOKENS.IProfileService)
    private readonly profileService: IProfileService,
  ) {}
  async getProfileById(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;
      const profile = await this.profileService.getProfileById(profileId);

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
      const profileData: IProfilePayload = req.body;
      const token: string = req.cookies.Token;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userPayload = verify(token);

      if (!userPayload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const newProfile = await this.profileService.createProfile(
        profileData,
        userPayload.id,
      );

      //TODO: convert profileId to jwt
      res.cookie("profileId", newProfile.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(201).json({ message: "Profile created", newProfile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;
      const profileData: IProfilePayload = req.body;

      const updatedProfile = await this.profileService.updateProfile(
        profileId,
        profileData,
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res
        .status(200)
        .json({ message: "Profile updated", updatedProfile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async addMovieToFavoriteList(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;
      const movieData: IMovie = req.body;

      const isAdded = await this.profileService.addMovieToFavoriteList(
        profileId,
        movieData,
      );

      if (!isAdded) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({ message: "Movie added to favorites" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async removeMovieFromFavoriteList(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;
      const movieId: string = req.body.movieId;

      const isRemoved = await this.profileService.removeMovieFromFavoriteList(
        profileId,
        movieId,
      );

      if (!isRemoved) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({ message: "Movie removed from favorites" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;

      const isDeleted = await this.profileService.deleteProfile(profileId);

      if (!isDeleted) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.clearCookie("profileId", { httpOnly: true });

      return res.status(200).json({ message: "Profile deleted" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFavoriteList(req: Request, res: Response) {
    try {
      const profileId: string = req.cookies.profileId;

      const favoritesList = await this.profileService.getFavoritesList(
        profileId,
      );

      if (!favoritesList || favoritesList.length <= 0) {
        return res
          .status(200)
          .json({ message: "No favorite list", favoritesList });
      }

      return res
        .status(200)
        .json({ message: "Favorite list", favoriteList: favoritesList });
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
