import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoviesByPageRequest } from "@/api/api";
import IBaseMovie from "@/api/interfaces/IBaseMovie";

export const useInfiniteMovies = () => {
  return useInfiniteQuery<IBaseMovie[], Error, IBaseMovie[], string[], number>({
    queryKey: ["infinite-movies"],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getMoviesByPageRequest({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};
