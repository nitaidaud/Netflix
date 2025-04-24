import { getProfilesRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await getProfilesRequest(),
  });
}
