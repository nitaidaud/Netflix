type NavBarProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  const NavBar: React.FC<NavBarProps> = ({ children, className = "" }) => {
    return (
      <nav className={`w-full bg-gradient-to-b from-black to-transparent text-white p-4 ${className}`}>
        {children}
      </nav>
    );
  };
  
  export default NavBar;
  