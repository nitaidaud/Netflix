import { Link } from "react-router-dom";

type NavLinksProps = {
  isAuthenticated: boolean;
};

const links = [
  { name: "Home", href: "/" },
  { name: "TV Shows", href: "/tv" },
  { name: "Movies", href: "/movies" },
  { name: "New & Popular", href: "/new-popular" },
  { name: "My List", href: "/mylist" },
  { name: "Browse by languages", href: "/languages" },
];

const NavLinks = ({ isAuthenticated }: NavLinksProps) => {
  return (
    <div className="flex items-center gap-10">
      <Link to="/">
        <img src="/logo.png" alt="Netflix Logo" className="h-8 md:h-10" />
      </Link>
      {isAuthenticated &&
        links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="text-white relative font-medium hover:underline cursor-pointer hover:text-red-500 duration-150 after:absolute after:w-full after:h-0.5 after:bg-red-500 after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {link.name}
          </Link>
        ))}
    </div>
  );
};

export default NavLinks;
