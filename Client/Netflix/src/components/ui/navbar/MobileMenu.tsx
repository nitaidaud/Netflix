import { motion } from "framer-motion";
import NavLinks from "./NavLinks";

type MobileMenuProps = {
  isOpen: boolean;
  isAuthenticated: boolean;
};

const MobileMenu = ({ isOpen, isAuthenticated }: MobileMenuProps) => {
  return (
    <motion.div
      className="fixed top-[60px] left-0 w-full z-40 md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/80 backdrop-blur-sm"
      initial={false}
      animate={{
        maxHeight: isOpen ? 400 : 0,
        opacity: isOpen ? 1 : 0,
        padding: isOpen ? "1rem 0" : 0,
      }}
    >
      <div className="flex flex-col space-y-4 px-4">
        <NavLinks isAuthenticated={isAuthenticated} isMobile={true} />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
