import { Router } from "express";
import { container } from "../config/inversify";
import { ProfileController } from "../controllers/profile.controller";
import TOKENS from "../../tokens";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TOKENS.ProfileController,
);

profileRouter.get("/get-profile", (req, res) => {
  profileController.getProfileById(req, res);
});

profileRouter.post("/create-profile", (req, res) => {
  profileController.createProfile(req, res);
});

profileRouter.patch("/update-profile", (req, res) => {
  profileController.updateProfile(req, res);
});

profileRouter.patch("/add-movie", (req, res) => {
  profileController.addMovieToFavoriteList(req, res);
});

profileRouter.patch("/remove-movie", (req, res) => {
  profileController.removeMovieFromFavoriteList(req, res);
});

profileRouter.delete("/delete-profile", (req, res) => {
  profileController.deleteProfile(req, res);
});

profileRouter.get("/get-favorites-list", (req, res) => {
  profileController.getFavoriteList(req, res);
});

profileRouter.get("/get-all-profiles", (req, res) => {
  profileController.getAllProfiles(req, res);
});

export default profileRouter;
