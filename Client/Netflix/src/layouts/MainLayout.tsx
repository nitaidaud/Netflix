import { ReactNode } from "react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";
import Footer from "@/components/shared/Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NetflixNavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;