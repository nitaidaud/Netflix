import { Request, Response, Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { TOKENS } from "../../tokens";
import { container } from "../config/inversify";

const movieRouter = Router();

const movieController = container.get<MovieController>(TOKENS.MovieController);

//example for route
movieRouter.get("/get-all-movies", (req: Request, res: Response) => {
  movieController.getAllMovies(req, res);
});

export { movieRouter };
