import IPopularMovie from "./IPopularMovie";

export default interface IMovieService {
    getPopularMovies(): Promise<IPopularMovie[]>;
    getMovieById(id: string): Promise<any>;
    search(title: string): Promise<any>;
    getMoviesByGenre(genre: string): Promise<any>;
    getTopMovies(): Promise<any>;
    getTrailerById(movieId: string): Promise<string | null>;
    //searchMovies(query: string): Promise<any>;
    getMoviesByPage(page?: number): Promise<any>;
    getNewMovies(): Promise<any[]>;
    getComedyMovies(): Promise<any[]>;
    getHorrorMovies(): Promise<any[]>;
    getActionMovies(): Promise<any[]>;
    getRomanceMovies(): Promise<any[]>;
    getKidsMovies(): Promise<any[]>;
    getAnimationMovies(): Promise<any[]>;
    getCrimeMovies(): Promise<any[]>;
    getDocumentaryMovies(): Promise<any[]>;

    getHomeContent(): Promise<any>;
 }