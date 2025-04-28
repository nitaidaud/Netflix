export default interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
}
