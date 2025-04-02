import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import NetflixNavBar from "./components/shared/NeftlixNavBar";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SignInPage from "./pages/auth/Signin";
import SignupPage from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <NetflixNavBar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
