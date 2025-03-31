import IPopularMovie from "./IPopularMovie";

export default interface IMovieService {
    getPopularMovies(): Promise<IPopularMovie[]>;
    getMovieById(id: string): Promise<any>;
    getMovieByTitle(title: string): Promise<any>;
    getMoviesByGenre(genre: string): Promise<any>;
    getTopMovies(): Promise<any>;
 }