import EmptyState from "@/components/browse/EmptyState";
import Filters from "@/components/browse/filters/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";
import MovieModal from "@/components/home/movieModal/MovieModal";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import { useBrowseMovies } from "@/hooks/useCategoryMovies";
import { openModal } from "@/store/slice/modal.slice";
import { setCategory } from "@/store/slice/movies.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.movies.selectedCategory
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

  const handleMoreInfo = (movieId: number) => {
    dispatch(openModal(movieId));
  };

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
          <MoviesGrid
            isLoading={false}
            movies={movies}
            onMoreInfo={handleMoreInfo} // 👈 Pass here
          />
          <div ref={ref} className="h-[100px]" />
        </>
      )}

      {(isFetchingNextPage || isFetching) && (
        <div className="p-4">
          <LoadingContentAnimation />
        </div>
      )}

      <MovieModal />
    </div>
  );
};

export default Browse;
