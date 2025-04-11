import { motion, AnimatePresence } from "framer-motion";
import EmailVerification from "@/features/navbar/EmailVerification";
import { useAppSelector } from "@/store/Store";
import { useLocation } from "react-router-dom";
import VerifiedEmailMessage from "../ui/navbar/VerifiedEmailMessage";
import STRINGS from "../shared/STRINGS";

type NavBarProps = {
  children: React.ReactNode;
  className?: string;
};

const NavBar: React.FC<NavBarProps> = ({ children, className = "" }) => {
  const authState = useAppSelector((state) => state.auth);
  const { state } = useLocation();
  const cameFromVerifyEmail = (state?.cameFromVerifyEmail as boolean) || false;

  return (
    <motion.nav
      className={`w-full text-white p-2 md:p-4 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <AnimatePresence>
        {cameFromVerifyEmail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VerifiedEmailMessage message={STRINGS.emailVerified} />
          </motion.div>
        )}

        {authState.isAuthenticated && authState.emailVerified === false && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <EmailVerification />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </motion.nav>
  );
};

export default NavBar;
