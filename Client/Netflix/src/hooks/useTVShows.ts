import { useQuery } from "@tanstack/react-query";
import { getPopularTVShows } from "@/api/api";

export const useTVShows = () => {
  return useQuery({
    queryKey: ["tv-shows"],
    queryFn: getPopularTVShows,
  });
};
