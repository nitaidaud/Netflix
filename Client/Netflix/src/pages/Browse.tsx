import Filters from "@/components/browse/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";

const Browse = () => {
  return (
    <div className="relative w-full h-full max-w-7xl">
      <Filters />
      <div className="max-w-7xl mx-auto">
      <MoviesGrid />
    </div>
    </div>
  );
};

export default Browse;
