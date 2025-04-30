import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TOKENS } from "../../tokens";
import { handleError } from "../utils/handle-error-request";
import ITVService from "../interfaces/ITVService";

@injectable()
export class TVController {
  constructor(@inject(TOKENS.ITVService) private tvService: ITVService) {}

  async getSeasonDetails(req: Request, res: Response) {
    try {
      const { seriesId, seasonNumber } = req.params;
      const season = await this.tvService.getSeasonDetails(seriesId, seasonNumber);
      res.json(season);
    } catch (error) {
      handleError(res, error);
    }
  }
}