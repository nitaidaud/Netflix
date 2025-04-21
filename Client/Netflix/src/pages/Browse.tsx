import { useState } from "react";
import Filters from "@/components/browse/Filters";
import MoviesGrid from "@/components/browse/MovieGrid"; 
import { useCategoryMovies } from "@/hooks/useCategoryMovies";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: movies = [], isLoading } = useCategoryMovies(selectedCategory);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <MoviesGrid movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default Browse;
