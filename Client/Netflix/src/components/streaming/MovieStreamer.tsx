// components/HLSPlayer.tsx
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface MovieStreamerProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
}

const MovieStreamer: React.FC<MovieStreamerProps> = ({
  url,
  autoPlay = true,
  controls = true,
  width = '100%',
  height = 'auto',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error('HLS error:', data);
        setError('Playback error');
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      setError('HLS not supported in this browser');
    }
  }, [url]);

  return (
    <div style={{ width, height }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          controls={controls}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default MovieStreamer;
