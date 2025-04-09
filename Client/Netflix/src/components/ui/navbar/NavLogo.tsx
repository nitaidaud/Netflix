import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavLogo = () => {
  return (
    <Link to="/">
      <motion.img 
        src="/logo.png" 
        alt="Netflix Logo" 
        className="h-8 md:h-10"
      />
    </Link>
  );
};

export default NavLogo;