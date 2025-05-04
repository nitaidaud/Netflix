import { getSeasonByIdRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";


export const useSeasonById = (seriesId: number, seasonNumber: number) => {
  return useQuery({
    queryKey: ["Season", seriesId, seasonNumber],
    queryFn: () => getSeasonByIdRequest(seriesId, seasonNumber),
    enabled: !!seriesId, 
  });
};