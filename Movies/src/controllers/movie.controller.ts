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

  async getPopularMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieService.getPopularMovies();
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

  async getTrailer(req: Request, res: Response) {
    try{
      const movieId = req.params.id;
      const trailerKey = await this.movieService.getTrailerById(movieId);

      if(!trailerKey){
        res.status(404).json({ message: "No trailer found" });
        return;
      }

      res.json({ 
        key: trailerKey,
        embedUrl: `https://www.youtube.com/embed/${trailerKey}`,
      });
    } catch (err) {
      console.error("Error getting trailer:", err);
      handleError(res, err);
    }
  }

  async getMoviesByPage(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.params.page);
      if (isNaN(page) || page < 1) {
        throw new Error("Invalid page number");
      }
      const movies = await this.movieService.getMoviesByPage(page);
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }
}
