import Container from "@/components/shared/Container";
import Typography from "@/components/shared/Typography";
import STRINGS from "@/components/ui/auth/STRINGS";
import SignupForm from "@/features/auth/SignupForm";
import { clearAuthErrors } from "@/store/slice/auth.slice";
import { useAppDispatch } from "@/store/store";
import { Link, useLocation } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const defaultEmail = location.state?.email || "";

  return (
    <Container>
      <div className="w-full h-screen flex flex-col justify-center max-w-sm bg-black bg-opacity-80 text-white p-8 rounded-md space-y-4 shadow-lg">
        <Typography size="text-2xl" weight="font-bold" className="mb-4">
          {STRINGS.SignUp}
        </Typography>
        <SignupForm defaultEmail={defaultEmail} />
        <div className="text-sm text-gray-400 text-center mt-4">
          {STRINGS.AlreadyHaveAnAccount}{" "}
          <Link
            onClick={() => {
              dispatch(clearAuthErrors());
            }}
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
