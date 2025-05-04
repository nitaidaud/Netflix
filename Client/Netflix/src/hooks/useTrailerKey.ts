import { getMovieTrailerRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useTrailerKey(id: number, type: "movie" | "tv") {

  return useQuery({
    queryKey: [`${id}-type-${type}`],
    queryFn: async () => await getMovieTrailerRequest(id),
  });
}


