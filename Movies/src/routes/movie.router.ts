import { Request, Response, Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { TOKENS } from "../../tokens";
import { container } from "../config/inversify";

const movieRouter = Router();

const movieController = container.get<MovieController>(TOKENS.MovieController);

//example for route
movieRouter.get("/popular", (req: Request, res: Response) => {
  movieController.getPopularMovies(req, res);
});

movieRouter.get("/top", (req: Request, res: Response) => {
  movieController.getTopMovies(req, res);
})

movieRouter.get("/search", (req: Request, res: Response) => {
  movieController.getMovieByTitle(req, res);
})

movieRouter.get("/genre/:genre", (req: Request, res: Response) => {
  movieController.getMoviesByGenre(req, res);
})

movieRouter.get("/:id", (req: Request, res: Response) => {
  movieController.getMovieById(req, res);
})

export { movieRouter };
