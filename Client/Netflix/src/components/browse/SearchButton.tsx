import { Button } from "../ui/button"

const SearchButton = () => {
    return (
      <div className="h-full gap-2 mt-0.5">
        {/* <button className="bg-black  hover:bg-zinc-800 text-white p-2 rounded-full h-full border-2 transition duration-300 ease-in-out border-black hover:border-gray-400 flex items-center justify-center">
        <img src="../search-icon.png" alt="search" className="w-5 h-5" /> 
        </button> */}
        <Button variant="ghost">
          <img src="../search-icon.png" alt="search" className="w-5 h-5" />
        </Button>
      </div>
    )
  }
  
  export default SearchButton