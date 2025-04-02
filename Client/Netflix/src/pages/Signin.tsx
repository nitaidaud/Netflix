import { Link } from "react-router-dom";
import Container from "../components/shared/Container";
import Typography from "../components/shared/Typography";
import STRINGS from "../components/ui/auth/STRINGS";
import SigninForm from "../features/auth/signin";

const SigninPage = () => {
  return (
    <Container>
      <div className="w-full max-w-sm bg-black bg-opacity-80 text-white p-8 rounded-md space-y-4 shadow-lg">
        <Typography size="text-2xl" weight="font-bold" className="mb-4">
          {STRINGS.SignIn}
        </Typography>
        <SigninForm />
        <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
          <span className="hover:underline cursor-pointer">
            <Link to="/forgot-password">{STRINGS.ForgotPassword}</Link>
          </span>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox bg-transparent border-gray-500"
            />
            <span>{STRINGS.RememberMe}</span>
          </label>
        </div>
        <div className="text-sm text-gray-400 text-center mt-4">
          {STRINGS.NewToNetflix}{" "}
          <Link
            to="/signup"
            className="text-white font-medium hover:underline cursor-pointer"
          >
            {STRINGS.SignUpNow}
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

export default SigninPage;
