import EmptyState from "@/components/browse/EmptyState";
import Filters from "@/components/browse/filters/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import { useBrowseMovies } from "@/hooks/useCategoryMovies";
import { setCategory } from "@/store/slice/movies.slice";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const dispatch = useDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.movies.selectedCategory,
  );
  const searchQuery = useAppSelector((state) => state.movies.searchQuery);
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView();

  // Get category from URL if present
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      dispatch(setCategory(categoryFromUrl));
    }
  }, [searchParams, dispatch]);

  // Fetch movies using the query hook with both category and search params
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useBrowseMovies({
    category: selectedCategory,
    searchQuery,
  });

  // Load more movies when scrolling to the bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten movie data from all pages
  const movies = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto">
      <Filters />

      {isLoading ? (
        <div className="p-4 mt-6">
          <LoadingContentAnimation />
        </div>
      ) : movies.length === 0 ? (
        <EmptyState category={selectedCategory} searchQuery={searchQuery} />
      ) : (
        <>
          <MoviesGrid isLoading={false} movies={movies} />
          <div ref={ref} className="h-[100px]" />
        </>
      )}

      {(isFetchingNextPage || isFetching) && (
        <div className="p-4">
          <LoadingContentAnimation />
        </div>
      )}
    </div>
  );
};

export default Browse;
