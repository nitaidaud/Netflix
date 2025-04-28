import { useEffect, useState } from "react";
import Filters from "@/components/browse/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";
import { useCategoryMovies } from "@/hooks/useCategoryMovies";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("new");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
  if (category) {
    setSelectedCategory(category);
  }
  }, [category]);

  const { data: categoryMovies = [], isLoading: loadingCategory } =
    useCategoryMovies(searchQuery ? null : selectedCategory);

  const { data: searchResults = [], isLoading: loadingSearch } =
    useSearchMovies(searchQuery);

  const isLoading = searchQuery ? loadingSearch : loadingCategory;
  const movies = searchQuery ? searchResults : categoryMovies;

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={setSearchQuery}
      />
      <MoviesGrid movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default Browse;
