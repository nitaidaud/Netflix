import { useState } from "react";
import SearchButton from "./SearchButton";

type Props = {
  onSearch: (val: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex align-baseline h-full">
      <input
        className="border-2 border-gray-300 p-1.5 mr-1 h-full"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton />
    </form>
  );
};

export default SearchBar;
