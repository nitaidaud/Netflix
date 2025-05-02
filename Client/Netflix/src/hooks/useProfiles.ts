import { getProfilesRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

 function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await getProfilesRequest(),
    enabled: true
  });
}

export { useProfiles };
