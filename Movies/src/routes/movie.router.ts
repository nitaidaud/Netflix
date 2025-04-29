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
});

movieRouter.get("/search", (req: Request, res: Response) => {
  movieController.search(req, res);
});

movieRouter.get("/genre/:genre", (req: Request, res: Response) => {
  movieController.getMoviesByGenre(req, res);
});

movieRouter.get("/getMovieById/:id", (req: Request, res: Response) => {
  movieController.getMovieById(req, res);
});

movieRouter.get("/:id/trailer", (req: Request, res: Response) => {
  movieController.getTrailer(req, res);
});

movieRouter.get("/getMovies/page/:page?", (req: Request, res: Response) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.get("/getMovies", (req: Request, res: Response) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.get("/new", (req: Request, res: Response) => {
  movieController.getNewMovies(req, res);
});

movieRouter.get("/comedy", (req: Request, res: Response) => {
  movieController.getComedyMovies(req, res);
});

movieRouter.get("/horror", (req: Request, res: Response) => {
  movieController.getHorrorMovies(req, res);
});

movieRouter.get("/action", (req: Request, res: Response) => {
  movieController.getActionMovies(req, res);
});

movieRouter.get("/romance", (req: Request, res: Response) => {
  movieController.getRomanceMovies(req, res);
});

movieRouter.get("/kids", (req: Request, res: Response) => {
  movieController.getKidsMovies(req, res);
});

movieRouter.get("/animation", (req: Request, res: Response) => {
  movieController.getAnimationMovies(req, res);
});

movieRouter.get("/crime", (req: Request, res: Response) => {
  movieController.getCrimeMovies(req, res);
});

movieRouter.get("/documentary", (req: Request, res: Response) => {
  movieController.getDocumentaryMovies(req, res);
});

movieRouter.get("/home", (req: Request, res: Response) => {
  movieController.getHomeContent(req, res);
});

export { movieRouter };
