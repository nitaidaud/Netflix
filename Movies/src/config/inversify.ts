import { Container } from "inversify";
import { TOKENS } from "../../tokens";
import { MovieController } from "../controllers/movie.controller";
import IMovieService from "../interfaces/IMovieService";
import { MovieService } from "../services/movie.service";
import ITVService from "../interfaces/ITVService";
import { TVController } from "../controllers/tv.controller";
import { TVService } from "../services/tv.service";

const container = new Container();

container.bind<IMovieService>(TOKENS.IMovieService).to(MovieService);
container.bind<MovieController>(TOKENS.MovieController).to(MovieController);

container.bind<ITVService>(TOKENS.ITVService).to(TVService);
container.bind<TVController>(TOKENS.TVController).to(TVController);

export {container}