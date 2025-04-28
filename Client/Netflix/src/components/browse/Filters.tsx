import SearchBar from "./SearchBar";
import Typography from "../shared/Typography";
import Select from "../ui/browse/Select";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (val: string) => void;
  onSearch: (val: string) => void;
};

const Filters = ({ selectedCategory, setSelectedCategory, onSearch }: FiltersProps) => {
  return (
    <div className="mt-20 flex justify-between items-center flex-wrap gap-4">
      <div>
        <Typography size="text-2xl" weight="font-bold">
          {`Browse${selectedCategory ? ` By ${selectedCategory}` : ""}`}
        </Typography>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 h-10">
          <Typography size="text-lg" weight="font-light">sort by</Typography>
          <Select onChange={setSelectedCategory} />
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Filters;
