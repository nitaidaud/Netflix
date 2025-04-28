import Typography from "@/components/shared/Typography";
import { clearFilters } from "@/store/slice/movies.slice";
import { useAppSelector } from "@/store/store";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import CategoryFilter from "./CategoryFilter";
import SearchInput from "./SearcInput";

const Filters = () => {
  const dispatch = useDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.movies.selectedCategory,
  );
  const searchQuery = useAppSelector((state) => state.movies.searchQuery);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const displayTitle = () => {
    if (searchQuery) {
      return `Search Results: "${searchQuery}"`;
    } else if (selectedCategory) {
      return `Browse By ${selectedCategory}`;
    }
    return "Browse";
  };

  return (
    <div className="mt-20 flex justify-between items-center flex-wrap gap-4">
      <div>
        <Typography size="text-2xl" weight="font-bold">
          {displayTitle()}
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <CategoryFilter />
        <SearchInput />
        {(selectedCategory || searchQuery) && (
          <X className="cursor-pointer" onClick={handleClearFilters} />
        )}
      </div>
    </div>
  );
};

export default Filters;
