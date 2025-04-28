import { getMoviesByPageRequest } from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMovies = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-movies"],
    queryFn: ({ pageParam = 1 }) => getMoviesByPageRequest(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};
