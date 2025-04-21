import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategoryRequest } from "@/api/api";

export function useCategoryMovies(category: string | null) {
  return useQuery({
    queryKey: ["category-movies", category],
    enabled: !!category,
    queryFn: () => getMoviesByCategoryRequest(category!), 
  });
}


