import { InfoIcon, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";

type HeroSectionProps = {
  title: string;
  overview: string;
  backdropPath: string;
  movieId: number;
};

const HeroSection = ({
  title,
  overview,
  backdropPath,
  movieId,
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { data } = useTrailerKey(movieId, "movie");
  const cleanUrl = cleanYouTubeEmbedUrl(data?.embedUrl);
  const navigate = useNavigate();

  // Start video after 2 seconds if user hasn't scrolled
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.scrollY < window.innerHeight * 0.6) {
        setIsPlaying(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Stop video on scroll
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.2;
      if (window.scrollY > threshold) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center md:bg-top overflow-hidden"
      style={{
        backgroundImage: !isPlaying
          ? `url(https://image.tmdb.org/t/p/original${backdropPath})`
          : undefined,
      }}
    >
      {/* Video trailer with fade-in */}
      {cleanUrl && isPlaying && (
        <div className="absolute top-0 left-0 w-full h-full animate-fade-in z-0">
          <ReactPlayer
            playing
            loop
            muted={isMuted}
            url={cleanUrl}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: "scale(1.2)",
              transformOrigin: "center",
              zIndex: 0,
              pointerEvents: "none",
              scale: 1.3,
            }}
          />
        </div>
      )}

      {/* Dark overlay & movie info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent px-10 py-15 flex flex-col justify-end z-10">
        <h1 className="text-white text-4xl font-bold mb-2">{title}</h1>
        <p className="text-white text-sm max-w-xl mb-4 line-clamp-3">
          {overview}
        </p>
        <div className="flex gap-3">
          <Button
            className="bg-white text-black font-semibold hover:bg-zinc-400 h-9.5"
            onClick={() => {
              navigate(`/movie/stream`);
            }}
          >
            <img
              src="/icons/play_icon.png"
              alt="Play"
              className="w-4 h-4 mr-0.5"
            />
            Play
          </Button>
          <Button
            variant="ghost"
            className="bg-gray-600/20 text-white hover:bg-gray-500/30 hover:text-white rounded-sm h-10"
          >
            <InfoIcon className="w-4 h-4" />
            More Info
          </Button>
        </div>

        {/* Mute button */}
        {cleanUrl && isPlaying && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-12 right-6 text-white border-white border-2 p-2 rounded-full z-20"
          >
            {isMuted ? <VolumeX size={26} /> : <Volume2 size={26} />}
          </button>
        )}
      </div>

      {/* Fallback background image with opacity transition */}
      <img
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={title}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default HeroSection;
