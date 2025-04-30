import { injectable } from "inversify";
import tmbd from "../api/tmdb";
import IBaseMovie from "../interfaces/IBaseMovie";
import IBaseResponse from "../interfaces/IBaseResponse";
import IMovieService from "../interfaces/IMovieService";
import ITrailerResponse from "../interfaces/ITrailerResponse";
import genres from "../utils/genres";
import IHomeContent from "../interfaces/IHomeContent";
import RedisClient from "../config/redis";
import { TOKENS } from "../../tokens";
import IMoviesByPage from "../interfaces/IMoviesByPage";

@injectable()
export class MovieService implements IMovieService {
  private cacheClient = RedisClient;

  async getPopularMovies() {
    const cacheKey = TOKENS.PopularCacheName;

    // Check if movies exist in Redis
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning popular movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting popular movies new data");

    const res = await tmbd.get<IBaseResponse>("/movie/popular");
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getMovieById(id: string) {
    const cacheKey = `movie_${id}`;

    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log(`Returning movie ${id} cached data...`);
      const data = JSON.parse(cachedMovies) as IBaseMovie;
      return data;
    }
    console.log(`getting movie ${id} new data`);

    const res = await tmbd.get(`/movie/${id}`);
    const movie = res.data;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movie)); //1 hour
    return movie;
  }

  async search(title: string, page: number) {
    const cacheKey = `search_${title}_page${page}`;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log(
        `Returning search results for ${title} page ${page} cached data...`,
      );
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log(`getting search results for ${title} new data`);
    const res = await tmbd.get<IBaseResponse>(`/search/movie?query=${title}`, {
      params: { page },
    });
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    
    return movies;
  }

  async getMoviesByGenre(genre: string, page: number) {
    if (!genres.has(genre.toLowerCase())) {
      return [];
    }

    const genreId = genres.get(genre.toLowerCase());
    if (!genreId) {
      return [];
    }
    const cacheKey = genre + page;

    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log(`Returning movies by ${genre} cached data...`);
      const data = JSON.parse(cachedMovies) as IBaseMovie[];

      return data;
    }
    console.log(`getting ${genre} movies new data`);

    const res = await tmbd.get<IBaseResponse>(`/discover/movie`, {
      params: { with_genres: genreId, page },
    });

    await this.cacheClient.setEx(
      cacheKey,
      60 * 60,
      JSON.stringify(res.data.results),
    ); //1 hour
    return res.data.results;
  }

  async getTopMovies() {
    const cacheKey = TOKENS.TopMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning top movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting top movies new data");

    const res = await tmbd.get<IBaseResponse>("/movie/top_rated");
    const movies = res.data.results.slice(0, 10);
    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getTrailerById(Id: string) {
    const cacheKey = `trailer_${Id}`;
    const cached = await this.cacheClient.get(cacheKey);

    if (cached) {
      console.log(`Returning trailer for movie ${Id} cached data...`);
      //const data = JSON.parse(cached) as IBaseMovie[];
      return cached;
    }
    console.log(`getting trailer for movie ${Id} new data`);

    const { data } = await tmbd.get<ITrailerResponse | null>(
      `/movie/${Id}/videos`,
    );

    const key = data?.results[0]?.key ?? null;

    if (key)
      await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(key)); //1 hour
    return key;
  }

  async getMoviesByPage(page?: number, category?: string) {
    const cacheKey = `movies_page_${page}_${category ?? "browse"}`;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log(
        `Returning movies page ${page} category ${
          category ?? "browse"
        } cached data...`,
      );
      const cachedData = JSON.parse(cachedMovies) as IBaseMovie[];

      const data = cachedData;

      return data;
    }
    console.log(`getting movies page ${page} category ${category} new data`);
    const res = await tmbd.get<IBaseResponse>(`/discover/movie`, {
      params: { page },
    });

    const data = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(data)); //1 hour

    return data;
  }

  async getNewMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.NewMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log("Returning new movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting new movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/movie/now_playing`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getComedyMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.ComedyMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning comedy movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting comedy movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=35`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getHorrorMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.HorrorMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning horror movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting horror movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=27`);
    const movies = res.data.results;
    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getActionMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.ActionMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log("Returning action movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting action movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=28`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getRomanceMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.RomanceMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning romance movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting romance movies cached data");

    const res = await tmbd.get<IBaseResponse>(
      `/discover/movie?with_genres=10749`,
    );
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getKidsMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.KidsMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log("Returning kids movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting kids movies cached data");

    const res = await tmbd.get<IBaseResponse>(
      `/discover/movie?with_genres=10751`,
    );
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getAnimationMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.AnimationMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log("Returning animation movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting animation movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=16`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getCrimeMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.CrimeMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);
    if (cachedMovies) {
      console.log("Returning crime movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting crime movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=80`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getDocumentaryMovies(): Promise<IBaseMovie[]> {
    const cacheKey = TOKENS.DocumentaryMoviesCache;
    const cachedMovies = await this.cacheClient.get(cacheKey);

    if (cachedMovies) {
      console.log("Returning documentary movies cached data...");
      const data = JSON.parse(cachedMovies) as IBaseMovie[];
      return data;
    }
    console.log("getting documentary movies cached data");

    const res = await tmbd.get<IBaseResponse>(`/discover/movie?with_genres=99`);
    const movies = res.data.results;

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(movies)); //1 hour
    return movies;
  }

  async getHomeContent(): Promise<IHomeContent> {
    const cacheKey = TOKENS.HomeContentCache;
    const cachedContent = await this.cacheClient.get(cacheKey);

    if (cachedContent) {
      console.log("Returning home content cached data...");
      const data = JSON.parse(cachedContent) as IHomeContent;
      return data;
    }
    console.log("getting home content cached data");

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
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=10751`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=16`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=80`),
      tmbd.get<IBaseResponse>(`/discover/movie?with_genres=99`),
    ]);

    const result = {
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

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(result)); //1 hour
    return result;
  }
}
