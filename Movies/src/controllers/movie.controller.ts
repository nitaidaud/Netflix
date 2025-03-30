import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { handleError } from "../utils/handle-error-request";
import IMovieService from "../interfaces/IMovieService";
import { TOKENS } from "../../tokens";

@injectable()
export class MovieController {
  constructor(
    @inject(TOKENS.IMovieService) private movieService: IMovieService, 
  ) {}

  async getAllMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMovieById(req: Request, res: Response) {
    try{
      const { id } = req.params;
      const movie = await this.movieService.getMovieById(id);
      res.json(movie);
    } catch(error) {
      handleError(res, error);
    }
  }

  async getMovieByTitle(req: Request, res: Response) {
    try {
      const { title } = req.params;
      const movies = await this.movieService.getMovieByTitle(title as string);
      res.json(movies);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMoviesByGenre(req: Request, res: Response) {
    try {
      const { genre } = req.params;
      const movies = await this.movieService.getMoviesByGenre(genre);
      res.json(movies);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getTopMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieService.getTopMovies();
      res.json(movies);
    } catch (error) {
      handleError(res, error);
    }
  }

}
