import { Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { StreamerController } from "../controllers/streamer.controller";
import TOKENS from "../TOKENS";

const streamerRouter = Router();

const streamerController = container.get<StreamerController>(
  TOKENS.StreamerController,
);

streamerRouter.get("/start-process", (req: Request, res: Response) => {
  streamerController.processVideo(req, res);
});

streamerRouter.get("/get-movie", (req: Request, res: Response) => {
  console.log("in get movie");
  
  streamerController.getMovie(req, res);
});

export default streamerRouter;