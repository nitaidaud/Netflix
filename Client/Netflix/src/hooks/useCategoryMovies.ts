import {
  getMoviesByCategoryRequest,
  getMoviesByPageRequest,
  searchMoviesRequest,
} from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

type BrowseParams = {
  category?: string;
  searchQuery?: string;
};

export function useBrowseMovies({ category, searchQuery }: BrowseParams) {
  return useInfiniteQuery({
    queryKey: ["browse-movies", { category, searchQuery }],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      if (searchQuery) {
        return searchMoviesRequest(searchQuery, pageParam);
      }

      return category
        ? getMoviesByCategoryRequest(category, pageParam)
        : getMoviesByPageRequest(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;

      return allPages.length + 1;
    },
  });
}
