import { injectable } from "inversify";
import tmbd from "../api/tmdb";
import IBaseMovie from "../interfaces/IBaseMovie";
import IBaseResponse from "../interfaces/IBaseResponse";
import IMovieService from "../interfaces/IMovieService";
import ITrailerResponse from "../interfaces/ITrailerResponse";
import genres from "../utils/genres";
import IHomeContent from "../interfaces/IHomeContent";

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
    const { data } = await tmbd.get<ITrailerResponse | null>(
      `/movie/${Id}/videos`,
    );

    if (data) return data.results[0].key;
    return null;
  }

  async getMoviesByPage(page?: number) {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie`, {
      params: { page },
    });
    return res.data.results;
  }

  async getNewMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/movie/now_playing`);
    return res.data.results;
  }

  async getComedyMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=35`);
    return res.data.results;
  }

  async getHorrorMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=27`);
    return res.data.results;
  }

  async getActionMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=28`);
    return res.data.results;
  }

  async getRomanceMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(
      `/discover/movie?with_genres=10749`,
    );
    return res.data.results;
  }

  async getKidsMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(
      `/discover/movie?with_genres=10762`,
    );
    return res.data.results;
  }

  async getAnimationMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=16`);
    return res.data.results;
  }

  async getCrimeMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=80`);
    return res.data.results;
  }

  async getDocumentaryMovies(): Promise<IBaseMovie[]> {
    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=99`);
    return res.data.results;
  }

  async getHomeContent(): Promise<IHomeContent> {
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
      tmbd.get<IBaseResponse>(`/movie/now_playing`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=35`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=27`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=28`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=10749`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=10762`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=16`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=80`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=99`),
    ]);

    return {
      newMovies: newMovies.data.results,
      comedy: comedy.data.results,
      horror: horror.data.results,
      action: action.data.results,
      romance: romance.data.results,
      kids: kids.data.results,
      animation: animation.data.results,
      crime: crime.data.results,
      documentary: documentary.data.results,
    };
  }
}
