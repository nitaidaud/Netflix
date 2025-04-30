import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavLogo from "./NavLogo";

type NavLinksProps = {
  isAuthenticated: boolean;
  isMobile?: boolean;
};

const links = [
  { name: "Home", href: "/" },
  { name: "TV Shows", href: "/tv" },
  { name: "Movies", href: "/movies" },
  { name: "New & Popular", href: "/new-popular" },
  { name: "My List", href: "/my-list" },
  { name: "Browse", href: "/browse" },
 
];

const NavLinks = ({ isAuthenticated, isMobile = false }: NavLinksProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      className={`flex ${
        isMobile
          ? "flex-col space-y-4"
          : "items-center gap-4 md:gap-6 lg:gap-10"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <NavLogo />

      {isAuthenticated && (
        <div
          className={`${
            isMobile
              ? "flex flex-col space-y-3"
              : "flex space-x-3 md:space-x-4 lg:space-x-8"
          }`}
        >
          {links.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <Link
                to={link.href}
                className={`text-white text-sm md:text-base relative font-medium hover:text-red-500 transition-colors duration-300
                  after:absolute after:w-full after:h-0.5 after:bg-red-500 after:bottom-0 after:left-0 
                  after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 
                  hover:after:scale-x-100 hover:after:origin-bottom-left
                  ${isMobile ? "text-center" : ""}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default NavLinks;
