import SearchButton from "./SearchButton"

const SearchBar = () => {
  return (
    <div className="flex align-baseline h-full">
        <input className="border-2 border-gray-300 p-1.5 mr-1 h-full" type="text" placeholder="Search movies.."/>
        <SearchButton />
    </div>
  )
}

export default SearchBar