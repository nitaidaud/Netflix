
import { Link } from "react-router-dom";
import Container from "../components/shared/Container";
import Typography from "../components/shared/typography";
import Signin from "../features/Signin";
import { Button } from "@/components/ui/button";


const SigninPage = () => {

    return (
      <Container>
        <div className="w-full max-w-sm bg-black bg-opacity-80 text-white p-8 rounded-md space-y-4 shadow-lg">

          <Typography size="text-2xl" weight="font-bold" className="mb-4">
          Sign In
        </Typography>
          <Signin />
         <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
            <span className="hover:underline cursor-pointer">Forgot Password?</span>
            <label className="flex items-center space-x-2 cursor-pointer">
             <input type="checkbox" className="form-checkbox bg-transparent border-gray-500" />
              <span>Remember me</span>
            </label>
         </div>
          <div className="text-sm text-gray-400 text-center mt-4">
          New to Netflix?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline cursor-pointer">
            Sign up now.
          </Link>
        </div>
       <p className="text-xs text-gray-500 text-center leading-tight mt-6 max-w-xs mx-auto">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
         <span className="text-blue-500 hover:underline cursor-pointer">Learn more.</span>
       </p>
        </div>
      </Container>
    );
}

export default SigninPage;