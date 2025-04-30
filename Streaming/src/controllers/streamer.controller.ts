import { inject, injectable } from "inversify";
import TOKENS from "../TOKENS";
import IStreamerService from "../interfaces/IStreamerService";
import { Request, Response } from "express";
import { MOVIE_URL } from "../env_exports";

@injectable()
export class StreamerController {
  constructor(
    @inject(TOKENS.IStreamerService) private streamerService: IStreamerService,
  ) {}

  async processVideo(req: Request, res: Response) {
    const movieName = "Madagascar-movie";
    await this.streamerService.processVideo(movieName);

    res.status(200).json({ message: "Video processed successfully" });
  }

  async getMovie(req: Request, res: Response) {
    console.log("MOVIE_URL", MOVIE_URL);
    res
      .status(200)
      .json({ message: "video get successfully", movieUrl: MOVIE_URL });
  }
}
