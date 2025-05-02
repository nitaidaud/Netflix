export default interface IBaseMovie {
  id: number;
  title: string;
  release_date: string;
  type: "Movie" | "Show";
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  popularity: number;
  adult: boolean;
}
