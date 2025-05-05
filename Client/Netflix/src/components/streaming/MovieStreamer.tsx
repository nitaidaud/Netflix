import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

interface MovieStreamerProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
}

const MovieStreamer = ({
  url,
  autoPlay = true,
  controls = true,
}: MovieStreamerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === video ||
          document.fullscreenElement === video?.parentElement
      );
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error("HLS error:", data);
        setError("Playback error");
      });

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      setError("HLS not supported in this browser");
    }
  }, [url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {error ? (
        <p className="text-white text-center mt-4">{error}</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay={autoPlay}
            controls={controls}
            onClick={togglePlay}
            className="w-full h-full object-cover"
          />

          <div
            className={`absolute inset-0 z-10 flex flex-col justify-center items-start px-10 text-white bg-black/70 transition-opacity duration-500 pointer-events-none ${
              isPaused || isFullscreen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm text-gray-400 mb-1">You're watching</p>
            <h1 className="text-3xl font-bold leading-none">Madagascar</h1>
            <p className="max-w-md text-sm mt-1 text-gray-300">
              Four animal friends get a taste of the wild life when they break
              out of captivity at the Central Park Zoo and wash ashore on the
              island of Madagascar.
            </p>
          </div>

          
          {isPaused && (
            <div className="absolute bottom-6 right-10 text-white text-sm opacity-80 z-20 transition-opacity duration-500">
              Paused
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieStreamer;
