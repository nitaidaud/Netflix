import { ReactNode } from "react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/shared/ToastProvider";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NetflixNavBar />
      <ScrollToTop />
      <main className="min-h-fit h-screen flex-grow">{children}</main>
      <Footer />
      <ToastProvider />
    </>
  );
};

export default MainLayout;
