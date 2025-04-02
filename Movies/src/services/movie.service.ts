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

  async search(title: string) {
    const res = await tmbd.get(`/search/movie?query=${title}`);
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
      myster: 99,
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
    const res = await tmbd.get(`/discover/movie`, { params: { page } });
    return res.data.results;
  }

  async getNewMovies(): Promise<any> {
    const res = await tmbd.get(`/movie/now_playing`)
    return res.data.results;
  }

  async getComedyMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=35`);
    return res.data.results;
  }

  async getHorrorMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=27`);
    return res.data.results;
  }

  async getActionMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=28`);
    return res.data.results;
  }

  async getRomanceMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=10749`);
    return res.data.results;
  }

  async getKidsMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=10762`);
    return res.data.results;
  }

  async getAnimationMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=16`);
    return res.data.results;
  }

  async getCrimeMovies(): Promise<any[]> {
    const res = await tmbd.get(`/discover/movie?with_genres=80`);
    return res.data.results;
  }

  async getDocumentaryMovies(): Promise<any[]> {
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
      documentary
    ] = await Promise.all([
      this.getNewMovies(),
      this.getComedyMovies(),
      this.getHorrorMovies(),
      this.getActionMovies(),
      this.getRomanceMovies(),
      this.getKidsMovies(),
      this.getAnimationMovies(),
      this.getCrimeMovies(),
      this.getDocumentaryMovies()
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
      documentary
    }
  }
}
