import { Link, useLocation } from "react-router-dom";
import Container from "../components/Shared/Container";
import Typography from "../components/shared/Typography";
import Signup from "../features/Signup";
import STRINGS from "@/components/ui/auth/STRINGS";

const SignupPage = () => {
  const location = useLocation();
  const defaultEmail = location.state?.email || "";

  return (
    <Container>
      <div className="w-full max-w-sm bg-black bg-opacity-80 text-white p-8 rounded-md space-y-4 shadow-lg">
        <Typography size="text-2xl" weight="font-bold" className="mb-4">
          {STRINGS.SignUp}
        </Typography>
        <Signup defaultEmail={defaultEmail} />
        <div className="text-sm text-gray-400 text-center mt-4">
          {STRINGS.AlreadyHaveAnAcount}{" "}
          <Link
            to="/signin"
            className="text-white font-medium hover:underline cursor-pointer"
          >
            {STRINGS.SignInNow}
          </Link>
        </div>
        <p className="text-xs text-gray-500 text-center leading-tight mt-6 max-w-xs mx-auto">
          {STRINGS.ThisPageIsProtected}{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            {STRINGS.LearnMore}
          </span>
        </p>
      </div>
    </Container>
  );
};

export default SignupPage;
