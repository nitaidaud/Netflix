import { injectable } from "inversify";
import IMovieService from "../interfaces/IMovieService";
import tmbd from "../api/tmdb";
import IBaseResponse from "../interfaces/IBaseResponse";
import genres from "../utils/genres";
import IBaseMovie from "../interfaces/IBaseMovie";

@injectable()
export class MovieService implements IMovieService {
  async getPopularMovies() {
    const res = await tmbd.get<IBaseResponse>("/movie/popular");
    const movies = res.data.results;
    return movies;
  }

  async getMovieById(id: string) {
    const res = await tmbd.get(`/movie/${id}`);
    return res.data;
  }

  async search(title: string) {
    const res = await tmbd.get<IBaseResponse>(`/search/movie?query=${title}`);
    console.log("res", res);

    return res.data.results;
  }

  async getMoviesByGenre(genre: string) {
    if (!genres.has(genre.toLowerCase())) {
      return [];
    }

    const genreId = genres.get(genre.toLowerCase());
    if (!genreId) {
      return [];
    }

    const res = await tmbd.get<IBaseResponse>(`/discover/movie`, {
      params: { with_genres: genreId },
    });
    return res.data.results;
  }

  async getTopMovies() {
    const res = await tmbd.get<IBaseResponse>("/movie/top_rated");
    return res.data.results.slice(0, 10);
  }

  async getTrailerById(Id: string) {
    const {data} = await tmbd.get(`/movie/${Id}/videos`);
    
    if (data.results.length) return data.results[0].key;
    return null;
  }

  async getMoviesByPage(page?: number) {
    const res = await tmbd.get(`/discover/movie`, { params: { page } });
    return res.data.results;
  }

  async getNewMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/movie/now_playing`);
    return res.data.results;
  }

  async getComedyMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=35`);
    return res.data.results;
  }

  async getHorrorMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=27`);
    return res.data.results;
  }

  async getActionMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=28`);
    return res.data.results;
  }

  async getRomanceMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=10749`);
    return res.data.results;
  }

  async getKidsMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=10762`);
    return res.data.results;
  }

  async getAnimationMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=16`);
    return res.data.results;
  }

  async getCrimeMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=80`);
    return res.data.results;
  }

  async getDocumentaryMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=99`);
    return res.data.results;
  }

  async getHomeContent(): Promise<any> {
    const [
      newMovies,
      comedy,
      horror,
      action,
      romance,
      kids,
      animation,
      crime,
      documentary,
    ] = await Promise.all([
      this.getNewMovies(),
      this.getComedyMovies(),
      this.getHorrorMovies(),
      this.getActionMovies(),
      this.getRomanceMovies(),
      this.getKidsMovies(),
      this.getAnimationMovies(),
      this.getCrimeMovies(),
      this.getDocumentaryMovies(),
    ]);

    return {
      new: newMovies,
      comedy,
      horror,
      action,
      romance,
      kids,
      animation,
      crime,
      documentary,
    };
  }
}
