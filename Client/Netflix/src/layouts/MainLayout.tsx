import { ReactNode } from "react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";

type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NetflixNavBar />
      {children}
    </>
  );
};

export default MainLayout;
