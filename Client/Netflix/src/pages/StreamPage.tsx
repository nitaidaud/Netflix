// pages/Stream.tsx
import MovieStreamer from "@/components/streaming/MovieStreamer";
import { useMovieUrl } from "@/hooks/useMovieUrl";

const StreamPage = () => {
  const { data: hlsUrl, isLoading, isFetching } = useMovieUrl();

  console.log("hlsUrl", hlsUrl?.movieUrl);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!hlsUrl) return <div>Movie not found</div>;

  return (
    <div>
      <h1>Stream Movie</h1>
      <MovieStreamer url={hlsUrl.movieUrl}/>
    </div>
  );
};

export default StreamPage;
