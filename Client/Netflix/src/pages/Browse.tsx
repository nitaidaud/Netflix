import Filters from "@/components/browse/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("new");
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView(); 

  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMovies(selectedCategory);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={() => {}} // אין חיפוש כאן באינפיניט
      />

      {isLoading ? (
        <div className="p-4 mt-6">
          <LoadingContentAnimation />
        </div>
      ) : movies.length === 0 ? (
        <p className="text-white text-center my-10 text-lg">
          No movies found for "<span className="font-semibold">{selectedCategory}</span>"
        </p>
      ) : (
        <>
          <MoviesGrid movies={movies} isLoading={false} />
          <div ref={ref} className="h-10" />
        </>
      )}

      {isFetchingNextPage && (
        <div className="p-4">
          <LoadingContentAnimation />
        </div>
      )}

    </div>
  );
};

export default Browse;
