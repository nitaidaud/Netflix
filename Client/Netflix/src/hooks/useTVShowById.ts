import { getTVShowByIdRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";


export const useTVShowById = (id: number) => {
  return useQuery({
    queryKey: ["TVShow", id],
    queryFn: () => getTVShowByIdRequest(id),
    enabled: !!id, 
  });
};