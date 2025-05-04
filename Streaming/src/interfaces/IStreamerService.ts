export default interface IStreamerService {
  processVideo: (movieName: string) => Promise<void>;
}
