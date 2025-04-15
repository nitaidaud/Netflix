import { useAppSelector } from "@/store/store";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import SigninButton from "../auth/SigninButton";
import MobileMenu from "../ui/navbar/MobileMenu";
import NavLinks from "../ui/navbar/NavLinks";
import NavLogo from "../ui/navbar/NavLogo";
import NavBar from "./NavBar";

const NetflixNavBar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <NavBar
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 bg-black shadow-lg`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Section - Mobile Menu Button & Desktop Nav */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 transform rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks isAuthenticated={isAuthenticated} />
          </div>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? <LogoutButton /> : <SigninButton />}
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} isAuthenticated={isAuthenticated} />
    </NavBar>
  );
};

export default NetflixNavBar;
