import { getMovieRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useMovieUrl() {
  return useQuery({
    queryKey: ["movie-url"],
    queryFn: async () => await getMovieRequest(),
  });
}
