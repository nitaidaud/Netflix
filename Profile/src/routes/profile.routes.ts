import { Request, Response, Router } from "express";
import TOKENS from "../../tokens";
import { container } from "../config/inversify";
import { ProfileController } from "../controllers/profile.controller";
import { upload } from "../middleware/multer";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TOKENS.ProfileController,
);

profileRouter.post("/login", (req: Request, res: Response) => {
  profileController.login(req, res);
});

profileRouter.post("/logout", (req: Request, res: Response) => {
  profileController.logout(req, res);
});

profileRouter.get("/check-logged-in", (req: Request, res: Response) => {
  profileController.checkLoggedProfile(req, res);
});

profileRouter.get("/get-profile", (req: Request, res: Response) => {
  profileController.getProfileById(req, res);
});

profileRouter.post(
  "/create-profile",
  upload.single("image"),
  (req: Request, res: Response) => {
    profileController.createProfile(req, res);
  },
);

profileRouter.patch(
  "/update-profile",
  upload.single("image"),
  (req: Request, res: Response) => {
    profileController.updateProfile(req, res);
  },
);

profileRouter.patch("/add-movie", (req: Request, res: Response) => {
  profileController.addMovieToFavoriteList(req, res);
});

profileRouter.patch("/remove-movie", (req: Request, res: Response) => {
  profileController.removeMovieFromFavoriteList(req, res);
});

profileRouter.delete("/delete-profile", (req: Request, res: Response) => {
  profileController.deleteProfile(req, res);
});

profileRouter.get("/get-favorites-list", (req: Request, res: Response) => {
  profileController.getFavoriteList(req, res);
});

profileRouter.get("/get-all-profiles", (req: Request, res: Response) => {
  profileController.getAllProfiles(req, res);
});

export default profileRouter;
