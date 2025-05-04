import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TOKENS from "../../tokens";
import IMovie from "../Interfaces/IMovie";
import IProfile from "../Interfaces/IProfile";
import IProfileData from "../Interfaces/IProfilePayload";
import IProfileService from "../Interfaces/IProfileService";
import { handleError } from "../utils/handle-error-request";

@injectable()
export class ProfileController {
  constructor(
    @inject(TOKENS.IProfileService)
    private readonly profileService: IProfileService,
  ) {}

  async login(req: Request, res: Response) {
    try {
      const profile: IProfile = req.body;

      const profileToken = await this.profileService.login(profile);

      res.cookie(TOKENS.Token, profileToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "Login successful", success: true });
    } catch (error) {
      handleError(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie(TOKENS.Token, { httpOnly: true });

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async checkLoggedProfile(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;

      const profile = await this.profileService.getProfileByToken(profileToken);

      return res.status(200).json({ message: "Profile found", profile });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProfileById(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;

      const profile = await this.profileService.getProfileByToken(profileToken);

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

      const { token: profileToken, ...profile } =
        await this.profileService.createProfile(
          { name: profileData.name, image: file },
          token,
        );

      res.cookie(TOKENS.Token, profileToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
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

      const updatedProfile = await this.profileService.updateProfile(
        profileToken,
        {
          name: profileData.name,
          image: file,
        },
      );

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

      const myList = await this.profileService.addMovieToFavoriteList(
        profileToken,
        movieData,
      );

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

      const myList = await this.profileService.removeMovieFromFavoriteList(
        profileToken,
        movieId,
      );

      return res
        .status(200)
        .json({ message: "Movie removed from favorites", myList });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const profileName: string = req.body.name;

      await this.profileService.deleteProfile(profileName);

      res.clearCookie(TOKENS.Token, { httpOnly: true });

      return res
        .status(200)
        .json({ message: "Profile deleted", success: true });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFavoriteList(req: Request, res: Response) {
    try {
      const profileToken: string = req.cookies.profileToken;

      const favoritesList = await this.profileService.getFavoritesList(
        profileToken,
      );

      return res.status(200).json({ message: "Favorite list", favoritesList });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllProfiles(req: Request, res: Response) {
    try {
      const userToken: string = req.cookies.Token;

      const profiles = await this.profileService.getAllProfiles(userToken);

      return res.status(200).json({ message: "Profiles found", profiles });
    } catch (error) {
      handleError(res, error);
    }
  }
}
