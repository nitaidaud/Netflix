import { useMovieById } from "@/hooks/useMovieById";
import { useTrailerKey } from "@/hooks/useTrailerKey";
import { useEffect, useState } from "react";

import ModalHeader from "./ModalHeader";
import ModalInfo from "./ModalInfo";
import ModalLoadingPlaceholder from "../ModalLoadingPlaceholder";

interface MovieModalContentProps {
  movieId: number;
  onClose: () => void;
}

const MovieModalContent = ({ movieId, onClose }: MovieModalContentProps) => {
  const { data: movie, isLoading } = useMovieById(movieId);
  const { data: trailerData } = useTrailerKey(movieId, "movie");

  const [muted, setMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTrailer(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-2 sm:px-4 py-4 sm:py-8">
    <div className="relative w-full h-full md:h-auto max-w-none md:max-w-6xl bg-zinc-900 rounded-none md:rounded-md overflow-hidden shadow-xl">
      <div className="h-full overflow-y-auto">
        {isLoading || !movie ? (
          <ModalLoadingPlaceholder />
        ) : (
          <div className="h-full w-full">
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
        )}
      </div>
    </div>
  </div>
  
  );
};

export default MovieModalContent;
