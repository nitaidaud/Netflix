import { Container } from "inversify";
import { TOKENS } from "../../tokens";
import { MovieController } from "../controllers/movie.controller";
import IMovieService from "../interfaces/IMovieService";
import { MovieService } from "../services/movie.service";

const container = new Container();

container.bind<IMovieService>(TOKENS.IMovieService).to(MovieService);
container.bind<MovieController>(TOKENS.MovieController).to(MovieController);

export {container}