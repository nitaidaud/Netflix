import { ReactNode } from "react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NetflixNavBar />
      <ScrollToTop/>
      <main className="min-h-fit h-screen flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;