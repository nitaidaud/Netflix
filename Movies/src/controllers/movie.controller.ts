import { Request, Response } from "express";
import { injectable } from "inversify";
import { handleError } from "../utils/handle-error-request";

@injectable()
export class MovieController {
  constructor() {}

  async getAllMovies(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Hello World!" });
    } catch (error) {
      handleError(res, error);
    }
  }
}
