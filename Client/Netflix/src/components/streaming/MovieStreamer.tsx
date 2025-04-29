// components/VideoPlayer.tsx
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  url: string; // URL to the .m3u8 file
}

const MovieStreamer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsSupported(true);
      });

        hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error("HLS error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (
      videoRef.current &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      // Native HLS support (Safari, iOS)
      videoRef.current.src = url;
      setIsSupported(true);
    }
  }, [url]);

  return (
    <div>
      {isSupported ? (
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default MovieStreamer;
