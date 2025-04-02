import { injectable } from "inversify";
import IMovieService from "../interfaces/IMovieService";
import tmbd from "../api/tmdb";
import IPopularMovie from "../interfaces/IPopularMovie";

@injectable()
export class MovieService implements IMovieService {
  async getPopularMovies() {
    const res = await tmbd.get("/movie/popular");
    const movies = res.data.results as IPopularMovie[];
    return movies;
  }

  async getMovieById(id: string) {
    const res = await tmbd.get(`/movie/${id}`);
    return res.data;
  };

  async getMovieByTitle(title: string) {
    const res = await tmbd.get(`/search/movie`, {
      params: { query: title },
    });
    return res.data.results;
  };

  async getMoviesByGenre(genre: string) {
    const genreMap: {[key: string]: number} = {
      action: 28,
      comedy: 35,
      drama: 18,
      thriller: 53,
      adventure: 12,
      crime: 80,
      mystery: 99,
    };
    const genereId = genreMap[genre.toLowerCase()];
    if(!genereId) return [];

    const res = await tmbd.get(`/discover/movie`, {
      params: { with_genres: genereId },
    });
    return res.data.results;
  };

  async getTopMovies() {
    const res = await tmbd.get("/movie/top_rated");
    return res.data.results.slice(0, 10);
  };

  async getTrailerById(Id: string) {
    const res = await tmbd.get(`/movie/${Id}/videos`);
    if(res.data.results.length) return res.data.results[0].key;
    return null;
  }

  async getMoviesByPage(page?: number) {
    const res = await tmbd.get(`/movie/popular`, { params: { page } });
    return res.data.results;
  }
}
