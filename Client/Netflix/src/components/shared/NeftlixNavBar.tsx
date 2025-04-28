import { useAppSelector } from "@/store/store";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SigninButton from "../auth/SigninButton";
import { Button } from "../ui/button";
import DropdownProfile from "../ui/navbar/DropdownProfile";
import MobileMenu from "../ui/navbar/MobileMenu";
import NavLinks from "../ui/navbar/NavLinks";
import NavBar from "./NavBar";

const NetflixNavBar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isProfileLoggedIn = useAppSelector((state) => state.profile.isProfileLoggedIn);
  const profile = useAppSelector((state) => state.profile.profile);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const isBrowsePage = location.pathname.startsWith("/browse"); 

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (!isBrowsePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBrowsePage]);

  const navbarClass = isBrowsePage
    ? "bg-black"
    : isScrolled
    ? "bg-black shadow-lg"
    : "bg-gradient-to-b from-black/80 to-transparent";

  return (
    <NavBar
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${navbarClass}`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center">
          <Button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 transform rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
            )}
          </Button>

          <div className="hidden md:block">
            <NavLinks isAuthenticated={isAuthenticated} />
          </div>
        </div>

        {/* Right Section */}
        <div>
          {isAuthenticated ? (
            isProfileLoggedIn ? (
              <DropdownProfile currentProfile={profile} />
            ) : null
          ) : (
            <SigninButton />
          )}
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} isAuthenticated={isAuthenticated} />
    </NavBar>
  );
};

export default NetflixNavBar;
