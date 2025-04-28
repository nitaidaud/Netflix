type MovieCardProps = {
  title?: string;
  image?: string;
};

export default function MovieCard({ title = "", image }: MovieCardProps) {
  return (
    <div
      className="relative rounded-xs overflow-hidden group cursor-pointer
      transition-transform duration-300 hover:scale-105 shadow-lg"
    >
      <div className="w-full aspect-[16/10] bg-neutral-800 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-neutral-500 text-sm">No image</span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 py-2 flex items-end">
        <p className="text-white text-lg font-semibold line-clamp-2 transition-transform duration-300 group-hover:scale-[1.03]">
          {title}
        </p>
      </div>
    </div>
  );
}
