import { useMovieById } from "@/hooks/useMovieById";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import { useEffect, useState } from "react";

import ModalPlayButtons from "./ModalPlayButtons";
import ModalHeader from "./ModalHeader";
import ModalInfo from "./ModalInfo";

interface MovieModalContentProps {
  movieId: number;
  onClose: () => void;
}

const MovieModalContent = ({ movieId, onClose }: MovieModalContentProps) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
      <div className="relative w-full max-w-6xl bg-zinc-900 rounded-md overflow-hidden shadow-xl">
        <ModalHeader
          movie={movie}
          trailerUrl={trailerData?.embedUrl ?? null}
          showTrailer={showTrailer}
          muted={muted}
          setMuted={setMuted}
          onClose={onClose}
        />
        <ModalInfo movie={movie} />
      </div>
    </div>
  );
};

export default MovieModalContent;
