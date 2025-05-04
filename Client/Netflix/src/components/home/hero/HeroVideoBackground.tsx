import ReactPlayer from "react-player";

type HeroVideoBackgroundProps = {
    videoUrl: string;
    isMuted: boolean;
  };
  
  const HeroVideoBackground = ({ videoUrl, isMuted }: HeroVideoBackgroundProps) => (
    <div className="absolute top-0 left-0 w-full h-full animate-fade-in z-0">
      <ReactPlayer
        playing
        loop
        muted={isMuted}
        url={videoUrl}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "scale(1.4)",
          transformOrigin: "center",
          zIndex: 0,
          pointerEvents: "none",
          scale: 1.3,
        }}
      />
    </div>
  );

export default HeroVideoBackground;
  