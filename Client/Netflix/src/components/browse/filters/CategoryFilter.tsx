import Typography from "@/components/shared/Typography";
import SelectBox from "@/components/ui/browse/SelectBox";
import { setCategory } from "@/store/slice/movies.slice";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useAppSelector((state) => state.movies.selectedCategory)

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category || undefined));
  };

  return (
    <div className="flex items-center gap-2 h-10">
      <Typography size="text-lg" weight="font-light">
        sort by
      </Typography>
      <SelectBox 
        onChange={handleCategoryChange}
        selectedValue={selectedCategory}
      />
    </div>
  );
};

export default CategoryFilter;