import IBaseMovie from "@/api/interfaces/IBaseMovie";

interface ModalInfoProps {
  movie: IBaseMovie;
}

const ModalInfo = ({ movie }: ModalInfoProps) => {
  return (
    <div className="p-6 space-y-4 bg-zinc-900">
      <div className="flex items-end gap-4">
        <span className="text-gray-500 text-md">
          {new Date(movie.release_date).getFullYear()}
        </span>
      </div>
      <p className="text-lg text-gray-200">{movie.overview}</p>
    </div>
  );
};

export default ModalInfo;
