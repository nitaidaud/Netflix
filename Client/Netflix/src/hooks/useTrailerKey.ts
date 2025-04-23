import { getMovieTrailerRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useTrailerKey(id: number) {

  return useQuery({
    queryKey: [id],
    queryFn: async () => await getMovieTrailerRequest(id),
  });
}


