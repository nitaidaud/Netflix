import cleanYouTubeEmbedUrl from "@/utils/cleanTrailerUrl";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import ModalPlayButtons from "./ModalPlayButtons";
import IMovieDetails from "@/api/interfaces/IMovieDetails";

interface ModalHeaderProps {
  movie: IMovieDetails;
  trailerUrl: string | null;
  showTrailer: boolean;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  onClose: () => void;
}

const ModalHeader = ({
  movie,
  trailerUrl,
  showTrailer,
  muted,
  setMuted,
  onClose,
}: ModalHeaderProps) => {
  const cleanUrl = trailerUrl ? cleanYouTubeEmbedUrl(trailerUrl) : null;
  const { backdrop_path, title } = movie;

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        {!showTrailer || !cleanUrl ? (
          <motion.img
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : "/images/not-found-img.png"
            }
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <motion.div
            key="trailer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full scale-110 overflow-hidden object-cover object-center"
          >
            <ReactPlayer
              url={cleanUrl}
              playing
              muted={muted}
              width={"100%"}
              height={"100%"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: "scale(1.2)",
                transformOrigin: "center",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
      >
        <X size={30} />
      </button>

      {showTrailer && cleanUrl && (
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-13 right-6 text-white bg-black/40 p-2 rounded-full"
        >
          {muted ? <VolumeX size={26} /> : <Volume2 size={26} />}
        </button>
      )}
      <ModalPlayButtons movie={movie} />
    </div>
  );
};

export default ModalHeader;
