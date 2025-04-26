import { useQuery } from "@tanstack/react-query";
import { getMovieByIdRequest } from "@/api/api";

export const useMovieById = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieByIdRequest(id),
    enabled: !!id, 
  });
};