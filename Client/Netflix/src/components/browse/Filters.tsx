import { X } from "lucide-react";
import Typography from "../shared/Typography";
import SelectBox from "../ui/browse/SelectBox";
import SearchBar from "./SearchBar";

type FiltersProps = {
  selectedCategory?: string;
  setSelectedCategory: (val?: string) => void;
  onSearch: (val?: string) => void;
};

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  onSearch,
}: FiltersProps) => {
  return (
    <div className="mt-20 flex justify-between items-center flex-wrap gap-4">
      <div>
        <Typography size="text-2xl" weight="font-bold">
          {`Browse${selectedCategory ? ` By ${selectedCategory}` : ""}`}
        </Typography>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 h-10">
          <Typography size="text-lg" weight="font-light">
            sort by
          </Typography>
          <SelectBox
            onChange={setSelectedCategory}
            selectedValue={selectedCategory}
          />
        </div>
        <SearchBar onSearch={onSearch} />
        {selectedCategory && (
          <X
            onClick={() => {
              setSelectedCategory(undefined);
              onSearch(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Filters;
