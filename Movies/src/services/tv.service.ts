import { injectable } from "inversify";
import tmbd from "../api/tmdb";
import RedisClient from "../config/redis";
import ISeasonDetails from "../interfaces/ISeasonDetails";
import ITVService from "../interfaces/ITVService";

@injectable()
export class TVService implements ITVService {
  private cacheClient = RedisClient;

  async getSeasonDetails(seriesId: string, seasonNumber: string): Promise<ISeasonDetails> {
    const cacheKey = `tv_${seriesId}_season_${seasonNumber}`;

    const cached = await this.cacheClient.get(cacheKey);
    if (cached) {
      console.log("Returning cached season data...");
      return JSON.parse(cached);
    }

    const { data } = await tmbd.get<ISeasonDetails>(
      `/tv/${seriesId}/season/${seasonNumber}`
    );

    await this.cacheClient.setEx(cacheKey, 60 * 60, JSON.stringify(data));
    return data;
  }
}