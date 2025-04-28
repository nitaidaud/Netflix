import { Button } from "../ui/button";

const SearchButton = () => {
  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-full p-2 flex items-center justify-center hover:bg-zinc-800"
    >
      <img src="/search-icon.png" alt="Search" className="w-5 h-5" />
    </Button>
  );
};

export default SearchButton;
