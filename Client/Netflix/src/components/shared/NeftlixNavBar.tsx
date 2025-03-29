import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/Shared/NavBar";

const SignInButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign In
    </button>
  );
};

const NetflixNavBar = () => {
  return (
    <NavBar className="fixed top-0 left-0 z-50 bg-gradient-to-b from-black to-transparent">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
            <div className="flex items-center">
                <Link to="/">
                <img src="/logo.png" alt="Netflix Logo" className="h-8 md:h-10" />
                </Link>
            </div>
            
            <div className="flex items-center space-x-4">
                <SignInButton />
            </div>
        </div>
    </NavBar>
  );
};

export default NetflixNavBar;
