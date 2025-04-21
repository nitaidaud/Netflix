import { useQuery } from "@tanstack/react-query";
import { searchMoviesRequest } from "@/api/api";

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["search-movies", query],
    queryFn: () => searchMoviesRequest(query),
    enabled: !!query,
  });
};
