import EmailVerification from "@/features/navbar/EmailVerification";
import { useAppSelector } from "@/store/Store";
import { useLocation } from "react-router-dom";
import VerifiedEmailMessage from "../ui/navbar/VerifiedEmailMessage";
import STRINGS from "./STRINGS";

type NavBarProps = {
  children: React.ReactNode;
  className?: string;
};

const NavBar: React.FC<NavBarProps> = ({ children, className = "" }) => {
  const authState = useAppSelector((state) => state.auth);
  const { state } = useLocation();
  const cameFromVerifyEmail = (state?.cameFromVerifyEmail as boolean) || false;

  return (
    <nav
      className={`w-full bg-gradient-to-b from-black to-transparent text-white p-4 ${className}`}
    >
      {cameFromVerifyEmail && (
        <VerifiedEmailMessage message={STRINGS.emailVerified} />
      )}

      {!authState.emailVerified && authState.isAuthenticated && (
        <EmailVerification />
      )}
      {children}
    </nav>
  );
};

export default NavBar;
