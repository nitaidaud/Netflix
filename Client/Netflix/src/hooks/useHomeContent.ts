import { getHomeContentRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

function useHomeContent() {
  return useQuery({
    queryKey: ["home-content"],
    queryFn: async () => await getHomeContentRequest(),
  });
}

export default useHomeContent;
