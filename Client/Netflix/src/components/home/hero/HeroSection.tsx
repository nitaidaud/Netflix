import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroVideoBackground from "./HeroVideoBackground";
import HeroContent from "./HeroContent";
import HeroMuteButton from "./HeroMuteButton";
import HeroImageFallback from "./HeroImageFallback";

export type HeroSectionProps = {
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.scrollY < window.innerHeight * 0.6) {
        setIsPlaying(true);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.2;
      setIsPlaying(window.scrollY <= threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full h-[55vh] md:h-[80vh] bg-cover bg-center md:bg-top overflow-hidden border-b border-black"
      style={{
        backgroundImage: !isPlaying
          ? `url(https://image.tmdb.org/t/p/original${backdropPath})`
          : undefined,
      }}
    >
      {cleanUrl && isPlaying && (
        <HeroVideoBackground videoUrl={cleanUrl} isMuted={isMuted} />
      )}

      <HeroContent
        title={title}
        overview={overview}
        onPlay={() => navigate("/movie/stream")}
        id={movieId}
      />

      {cleanUrl && isPlaying && (
        <HeroMuteButton
          isMuted={isMuted}
          toggleMute={() => setIsMuted(!isMuted)}
        />
      )}

      <HeroImageFallback
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={title}
        hidden={isPlaying}
      />
    </div>
  );
};

export default HeroSection;
