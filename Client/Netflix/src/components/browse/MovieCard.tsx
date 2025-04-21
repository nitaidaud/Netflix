type MovieCardProps = {
    title?: string;
    image?: string;
  };
  
  export default function MovieCard({ title = "", image }: MovieCardProps) {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="w-full h-60 bg-neutral-800 flex items-center justify-center">
          {image ? (
            <img width={100} height={100} src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-neutral-500 text-sm">No image</span>
          )}
        </div>
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent px-2 py-1 text-white text-sm font-medium">
            {title}
          </div>
        )}
      </div>
    );
  }
  