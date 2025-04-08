import NavBar from "@/components/shared/NavBar";
import { useAppSelector } from "@/store/Store";
import LogoutButton from "../auth/LogoutButton";
import SigninButton from "../auth/SigninButton";
import NavLinks from "../ui/navbar/NavLinks";

const NetflixNavBar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavBar className="fixed top-0 left-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <NavLinks isAuthenticated={isAuthenticated} />

        <div className="flex items-center space-x-4">
          {isAuthenticated ? <LogoutButton /> : <SigninButton />}
        </div>
      </div>
    </NavBar>
  );
};

export default NetflixNavBar;
