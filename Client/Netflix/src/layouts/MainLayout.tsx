import { ReactNode } from "react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";
import Footer from "@/components/shared/Footer";

type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NetflixNavBar />
      {children}
      <Footer/>
    </>
  );
};

export default MainLayout;
