import { getMoviesByPageRequest } from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMovies = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["infinite-movies", category], 
    queryFn: ({ pageParam = 1 }) =>
      getMoviesByPageRequest({ pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.results.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};