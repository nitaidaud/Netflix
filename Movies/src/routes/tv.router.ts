import { Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../../tokens";
import { TVController } from "../controllers/tv.controller";

const tvRouter = Router();
const tvController = container.get<TVController>(TOKENS.TVController);

tvRouter.get("/season/:seriesId/:seasonNumber", (req, res) =>
  tvController.getSeasonDetails(req, res)
);

export { tvRouter };