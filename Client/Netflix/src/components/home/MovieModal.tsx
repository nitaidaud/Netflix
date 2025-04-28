import { useMovieById } from "@/hooks/useMovieById";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import ReactPlayer from "react-player/youtube";
import { X, Volume2, VolumeX, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

const MovieModal = ({ movieId, onClose }: MovieModalProps) => {
  const { data: movie, isLoading } = useMovieById(movieId);
  const { data: trailerData } = useTrailerKey(movieId);
  const [muted, setMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTrailer(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading || !movie) {
    return null;
  }

  const trailerUrl = trailerData?.embedUrl
    ? cleanYouTubeEmbedUrl(trailerData.embedUrl)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-[95%] max-w-6xl bg-zinc-900 rounded-md overflow-hidden">
        <div className="relative w-full h-[600px]">
          <AnimatePresence mode="wait">
            {!showTrailer || !trailerUrl ? (
              <motion.img
                key="poster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key="trailer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <ReactPlayer
                  url={trailerUrl}
                  playing
                  muted={muted}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
          >
            <X size={30} />
          </button>

          <div className="absolute bottom-24 left-6">
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
          </div>

          <div className="absolute bottom-6 left-6 flex gap-3 items-center">
            <Button className="bg-white text-black hover:bg-gray-300 rounded-sm h-10">
              <img
                src="/icons/play_icon.png"
                alt="Play"
                className="w-5 h-5 mr-2"
              />
              Play
            </Button>
            <Button className="bg-zinc-600 text-white hover:bg-zinc-500 rounded-full w-10 h-10 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {showTrailer && trailerUrl && (
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-6 right-6 text-white bg-black/40 p-2 rounded-full"
            >
              {muted ? <VolumeX size={26} /> : <Volume2 size={26} />}
            </button>
          )}
        </div>

        <div className="p-6 space-y-4 bg-zinc-900">
          <div className="flex items-end gap-4">
            <span className="text-gray-500 text-md">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <p className="text-lg text-gray-200">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
