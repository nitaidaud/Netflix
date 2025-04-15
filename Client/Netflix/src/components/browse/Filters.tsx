import { useState } from "react";
import Typography from "../shared/Typography";
import Select from "../ui/browse/select";
import SearchBar from "./SearchBar";

const Filters = () => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="mt-20 flex justify-between items-center flex-wrap gap-4">
      <div className="">
        <Typography size="text-2xl" weight="font-bold">
        {`Browse${selectedCategory ? ` By ${selectedCategory}` : ""}`}
        </Typography>
      </div>

      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-2"></div>

        <div className="flex items-center gap-2 h-10">
          <Typography size="text-lg" weight="font-light">
            sort by
          </Typography>
          <Select onChange={setSelectedCategory}/>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Filters;
