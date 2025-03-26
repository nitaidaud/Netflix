import { Link } from "react-router-dom";
import NavBar from "@/components/shared/NavBar";

const NetflixNavBar = () => {
  return (
    <NavBar className="fixed top-0 left-0 z-50 bg-black bg-opacity-80">
      
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Netflix Logo" className="h-8 md:h-10" />
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/signin" className="hover:underline">
          Sign In
        </Link>
      </div>
    </NavBar>
  );
};

export default NetflixNavBar;
