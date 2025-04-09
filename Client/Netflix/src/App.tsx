import { LucideLoader } from "lucide-react";
import { Suspense, useEffect, useTransition } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

// Pages
import AppLayout from "./layouts/AppLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ResetPassword from "./pages/ResetPassword";
import SignInPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import { useAppDispatch, useAppSelector } from "./store/Store";
import { checkAuth } from "./store/slice/auth.slice";
import MoviesPage from "./pages/MoviesPage";

// Layouts

function App() {
  const [pending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    startTransition(async () => {
      await dispatch(checkAuth());
    });
  }, [dispatch]);

  if (pending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LucideLoader className="animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      {/* {pending ? ( */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <LucideLoader className="animate-spin" />
          </div>
        }
      >
        {/* ) : ( */}
        <Routes>
          <Route element={<AppLayout />}>
            {isAuthenticated ? (
              <>
                <Route index element={<Home />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route index element={<Landing />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Route>
        </Routes>
      </Suspense>

      {/* )} */}
    </Router>
  );
}

export default App;
