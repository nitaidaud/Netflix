import { injectable } from "inversify";
import IMovieService from "../interfaces/IMovieService";

@injectable()
export class MovieService implements IMovieService {
  constructor() {}
}
