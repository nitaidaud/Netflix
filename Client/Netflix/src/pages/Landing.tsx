import Footer from "@/components/shared/Footer";
import GetStartedSection from "@/components/ui/landing/GetStartedSection";

const LandingPage = () => {
  return (
    <div className="relative w-full h-full">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div> */}
      <GetStartedSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
