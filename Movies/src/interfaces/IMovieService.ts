import IBaseMovie from "./IBaseMovie";
import IHomeContent from "./IHomeContent";

export default interface IMovieService {
    getPopularMovies(): Promise<IBaseMovie[]>;
    getMovieById(id: string): Promise<IBaseMovie>;
    search(title: string): Promise<IBaseMovie[]>;
    getMoviesByGenre(genre: string): Promise<IBaseMovie[]>;
    getTopMovies(): Promise<IBaseMovie[]>;
    getTrailerById(movieId: string): Promise<string | null>;
    //searchMovies(query: string): Promise<any>;
    getMoviesByPage(page?: number): Promise<IBaseMovie[]>;
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