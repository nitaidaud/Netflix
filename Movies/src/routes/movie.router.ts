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
  movieController.search(req, res);
})

movieRouter.get("/genre/:genre", (req: Request, res: Response) => {
  movieController.getMoviesByGenre(req, res);
})

movieRouter.get("/getMovieById/:id", (req: Request, res: Response) => {
  movieController.getMovieById(req, res);
})

movieRouter.get("/:id/trailer", (req: Request, res: Response) => {
  movieController.getTrailer(req, res);
})

movieRouter.get("/getMovies/page/:page?", (req, res) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.get("/getMovies", (req, res) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.get("/new", (req, res) =>{

  movieController.getNewMovies(req, res)
}
);

movieRouter.get("/comedy", (req, res) =>{
  movieController.getComedyMovies(req, res)
}
);

movieRouter.get("/horror", (req, res) =>{
  movieController.getHorrorMovies(req, res)
}
);

movieRouter.get("/action", (req, res) =>{
  movieController.getActionMovies(req, res)
}
);

movieRouter.get("/romance", (req, res) =>{
  movieController.getRomanceMovies(req, res)
}
);

movieRouter.get("/kids", (req: Request, res: Response) =>{
  movieController.getKidsMovies(req, res)
}
);

movieRouter.get("/animation", (req, res) =>{
  movieController.getAnimationMovies(req, res)
}
);

movieRouter.get("/crime", (req, res) =>{
  movieController.getCrimeMovies(req, res)
}
);

movieRouter.get("/documentary", (req, res) =>{
  movieController.getDocumentaryMovies(req, res)
}
);

movieRouter.get("/home", (req, res) =>{
  movieController.getHomeContent(req, res)
}
);

export { movieRouter };
