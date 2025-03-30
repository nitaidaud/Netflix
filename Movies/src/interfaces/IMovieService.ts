export default interface IMovieService {
    getAllMovies(): Promise<any>;
    getMovieById(id: string): Promise<any>;
    getMovieByTitle(title: string): Promise<any>;
    getMoviesByGenre(genre: string): Promise<any>;
    getTopMovies(): Promise<any>;
 }