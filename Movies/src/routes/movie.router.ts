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

movieRouter.get("/:id", (req: Request, res: Response) => {
  movieController.getMovieById(req, res);
})

movieRouter.get("/:id/trailer", (req: Request, res: Response) => {
  movieController.getTrailer(req, res);
})

movieRouter.get("/movies/page/:page?", (req, res) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.get("/movies", (req, res) =>
  movieController.getMoviesByPage(req, res),
);

movieRouter.post("/new", (req, res) =>{

  
  movieController.getNewMovies(req, res)
}
);

movieRouter.post("/comedy", (req, res) =>{
  console.log("ahhhh");
  
  movieController.getComedyMovies(req, res)
}
);

movieRouter.post("/horror", (req, res) =>{
  movieController.getHorrorMovies(req, res)
}
);

movieRouter.post("/action", (req, res) =>{
  movieController.getActionMovies(req, res)
}
);

movieRouter.post("/romance", (req, res) =>{
  movieController.getRomanceMovies(req, res)
}
);

movieRouter.post("/kids", (req, res) =>{
  movieController.getKidsMovies(req, res)
}
);

movieRouter.post("/animation", (req, res) =>{
  movieController.getAnimationMovies(req, res)
}
);

movieRouter.post("/crime", (req, res) =>{
  movieController.getCrimeMovies(req, res)
}
);

movieRouter.post("/documentary", (req, res) =>{
  movieController.getDocumentaryMovies(req, res)
}
);

movieRouter.post("/home", (req, res) =>{
  movieController.getHomeContent(req, res)
}
);

export { movieRouter };
