import EmptyState from "@/components/browse/EmptyState";
import Filters from "@/components/browse/filters/Filters";
import MoviesGrid from "@/components/browse/MovieGrid";
import MovieModal from "@/components/home/movieModal/MovieModal";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
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
  
  // Configure the intersection observer with a threshold
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    triggerOnce: false // Make sure it triggers every time it comes into view
  });

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
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // Flatten movie data from all pages
  const movies = data?.pages.flatMap((page) => page) ?? [];

  const handleMoreInfo = (movieId: number) => {
    dispatch(openModal(movieId));
  };

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto">
      <Filters />
      <div className="h-20" />
      {isLoading ? (
        <div className="p-4 mt-6">
          <LoadingContentAnimation />
        </div>
      ) : movies.length === 0 ? (
        <EmptyState category={selectedCategory} searchQuery={searchQuery} />
      ) : (
        <MoviesGrid
          isLoading={false}
          movies={movies}
          onMoreInfo={handleMoreInfo}
          lastMovieRef={ref}
        />
      )}
      
      {/* Loading indicator at the bottom */}
      {(isFetchingNextPage || (isFetching && !isLoading)) && (
        <div className="p-4">
          <LoadingContentAnimation />
        </div>
      )}
      <ScrollToTopButton/>
      <MovieModal />
    </div>
  );
};

export default Browse;