type NavBarProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  const NavBar: React.FC<NavBarProps> = ({ children, className = "" }) => {
    return (
      <nav className={`w-full bg-gray-900 text-white p-4 flex justify-between items-center ${className}`}>
        {children}
      </nav>
    );
  };
  
  export default NavBar;
  