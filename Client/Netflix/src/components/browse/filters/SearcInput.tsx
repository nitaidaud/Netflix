import { setCategory, setSearchQuery } from "@/store/slice/movies.slice";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchButton from "../SearchButton";

const SearchInput = () => {
  const dispatch = useDispatch();
  const currentSearchQuery = useAppSelector(
    (state) => state.movies.searchQuery,
  );
  const [query, setQuery] = useState(currentSearchQuery || "");

  useEffect(() => {
    setQuery(currentSearchQuery || "");
  }, [currentSearchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    dispatch(setCategory(undefined));
    dispatch(setSearchQuery(trimmedQuery || undefined));
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

export default SearchInput;
