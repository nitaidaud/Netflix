import GetStartedSection from "@/components/ui/landing/GetStartedSection";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative w-full h-full">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div> */}
      <GetStartedSection />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
        necessitatibus adipisci in amet, veniam nesciunt reiciendis fugiat totam
        est eveniet nobis alias incidunt temporibus facilis nostrum enim, cumque
        expedita perspiciatis!
        <Link to={"/home"}>Home</Link>
      </p>
    </div>
  );
};

export default LandingPage;
