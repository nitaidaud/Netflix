import NavBar from "@/components/shared/NavBar";
import { useAppSelector } from "@/store/Store";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import SigninButton from "../auth/SigninButton";

const NetflixNavBar = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
  );

  console.log("is auth", isAuthenticated);
  

  return (
    <NavBar className="fixed top-0 left-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.png" alt="Netflix Logo" className="h-8 md:h-10" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? <LogoutButton /> : <SigninButton />}
        </div>
      </div>
    </NavBar>
  );
};

export default NetflixNavBar;
