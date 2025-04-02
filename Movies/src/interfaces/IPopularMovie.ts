export default interface IPopularMovie {
    id: number;
    title: string;
    release_date: string;
    genre_ids: number[];
    poster_path: string;
    backdrop_path: string;
    overview: string;
    popularity: number;
}