import Container from "../components/shared/Container";
import Typography from "../components/shared/typography";
import Signup from "../features/signup";
import { Button } from "@/components/ui/button";

const SignupPage = () => {
  return (
    <Container>
      <div className="w-full max-w-sm bg-black bg-opacity-80 text-white p-8 rounded-md space-y-4 shadow-lg">
        <Typography size="text-2xl" weight="font-bold" className="mb-4">
          Sign Up
        </Typography>
        <Signup />
        <div className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span className="text-white font-medium hover:underline cursor-pointer">
            Sign in now.
          </span>
        </div>
        <p className="text-xs text-gray-500 text-center leading-tight mt-6 max-w-xs mx-auto">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Learn more.
          </span>
        </p>
      </div>
    </Container>
  );
};

export default SignupPage;
