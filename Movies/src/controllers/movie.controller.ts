import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { handleError } from "../utils/handle-error-request";
import IMovieService from "../interfaces/IMovieService";
import { TOKENS } from "../../tokens";

@injectable()
export class MovieController {
  constructor(
    @inject(TOKENS.IMovieService) private movieService: IMovieService
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
    try {
      const { id } = req.params;
      const movie = await this.movieService.getMovieById(id);
      res.json(movie);
    } catch (error) {
      handleError(res, error);
    }
  }

  async search(req: Request, res: Response) {
    try {
      const title: string = req.query.title ? req.query.title.toString() : "";
      const page = req.query.page ? Number(req.query.page) : 1;

      const movies = await this.movieService.search(title, page);
      res.json(movies);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMoviesByGenre(req: Request, res: Response) {
    try {
      const { genre } = req.params;
      const page = req.query.page ? Number(req.query.page) : 1;

      const movies = await this.movieService.getMoviesByGenre(genre, page);
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
    try {
      const movieId = req.params.id;
      const trailerKey = await this.movieService.getTrailerById(movieId);

      if (!trailerKey) {
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
      const { page } = req.params;

      if (!page) {
        const movies = await this.movieService.getMoviesByPage();
        res.json(movies);
      } else {
        const pageAsNumber = Number(page);

        if (pageAsNumber >= 1) {
          const movies = await this.movieService.getMoviesByPage(pageAsNumber);
          res.json(movies);
        } else {
          throw new Error("Invalid page number");
        }
      }
    } catch (err) {
      handleError(res, err);
    }
  }

  async getNewMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getNewMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getComedyMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getComedyMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getHorrorMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getHorrorMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getActionMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getActionMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getRomanceMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getRomanceMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getKidsMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getKidsMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAnimationMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getAnimationMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getCrimeMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getCrimeMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getDocumentaryMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getDocumentaryMovies();
      res.json(movies);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getHomeContent(req: Request, res: Response): Promise<void> {
    try {
      const content = await this.movieService.getHomeContent();
      res.json(content);
    } catch (err) {
      handleError(res, err);
    }
  }

  async getSeasonDetails(req: Request, res: Response) {
    try {
      const { seriesId, seasonNumber } = req.params;
      const season = await this.movieService.getSeasonDetails(
        seriesId,
        seasonNumber
      );
      res.json(season);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPopularTVShows(req: Request, res: Response) {
    try {
      const shows = await this.movieService.getPopularTVShows();
      res.json(shows);
    } catch (error) {
      handleError(res, error);
    }
  }
  async getTVShowById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tvShow = await this.movieService.getTVShowById(id);
      res.json(tvShow);
    } catch (error) {
      handleError(res, error);
    }
  }

  
}
