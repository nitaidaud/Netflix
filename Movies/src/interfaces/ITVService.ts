import ISeasonDetails from "./ISeasonDetails";

export default interface ITVService {
  getSeasonDetails(
    seriesId: string,
    seasonNumber: string
  ): Promise<ISeasonDetails>;
}
