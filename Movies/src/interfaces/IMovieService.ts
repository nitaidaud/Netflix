import IBaseMovie from "./IBaseMovie";
import IHomeContent from "./IHomeContent";

export default interface IMovieService {
  getPopularMovies(): Promise<IBaseMovie[]>;
  getMovieById(id: string): Promise<IBaseMovie>;
  search(title: string, page: number): Promise<IBaseMovie[]>;
  getMoviesByGenre(genre: string, page: number): Promise<IBaseMovie[]>;
  getTopMovies(): Promise<IBaseMovie[]>;
  getTrailerById(movieId: string): Promise<string | null>;
  //searchMovies(query: string): Promise<any>;
  getMoviesByPage(page?: number, category?: string): Promise<IBaseMovie[]>;
  getNewMovies(): Promise<IBaseMovie[]>;
  getComedyMovies(): Promise<IBaseMovie[]>;
  getHorrorMovies(): Promise<IBaseMovie[]>;
  getActionMovies(): Promise<IBaseMovie[]>;
  getRomanceMovies(): Promise<IBaseMovie[]>;
  getKidsMovies(): Promise<IBaseMovie[]>;
  getAnimationMovies(): Promise<IBaseMovie[]>;
  getCrimeMovies(): Promise<IBaseMovie[]>;
  getDocumentaryMovies(): Promise<IBaseMovie[]>;

  getHomeContent(): Promise<IHomeContent>;
}
