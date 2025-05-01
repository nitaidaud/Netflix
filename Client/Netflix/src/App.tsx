import { useEffect, useTransition } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

// Pages
import AppLayout from "./layouts/AppLayout";
import Browse from "./pages/Browse";
import CreateProfilePage from "./pages/CreateProfilePage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MoviesPage from "./pages/MoviesPage";
import MyListPage from "./pages/MyListPage";
import ProfileChoicePage from "./pages/ProfileChoicePage";
import ResetPassword from "./pages/ResetPassword";
import SignInPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import StreamPage from "./pages/StreamPage";
import UpdateProfilePage from "./pages/UpdateProfile";
import VerifyEmail from "./pages/VerifyEmail";
import { checkAuth } from "./store/slice/auth.slice";
import { checkLoggedInProfile } from "./store/slice/profile.slice";
import { useAppDispatch, useAppSelector } from "./store/store";
import UpdateProfilePage from "./pages/UpdateProfile";
import StreamPage from "./pages/StreamPage";
import TVShowPage from "./pages/TVShowsPage";

// Layouts

function App() {
  const [pending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const isProfileLoggedIn = useAppSelector(
    (state) => state.profile.isProfileLoggedIn,
  );

  useEffect(() => {
    startTransition(async () => {
      await dispatch(checkAuth());
      await dispatch(checkLoggedInProfile());
    });
  }, [dispatch]);

  if (pending) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <LucideLoader className="animate-spin" /> */}
        <img src="/images/loading-screen.gif" alt="loading screen" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          {isAuthenticated ? (
            isProfileLoggedIn ? (
              <>
                <Route index element={<Home />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/profiles" element={<ProfileChoicePage />} />
                <Route path="/profile/create" element={<CreateProfilePage />} />
                <Route path="/profile/update" element={<UpdateProfilePage />} />
                <Route path="/my-list" element={<MyListPage />} />
                <Route path="/movie/stream" element={<StreamPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/tv" element={<TVShowPage />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route index element={<ProfileChoicePage />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/profile/create" element={<CreateProfilePage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )
          ) : (
            <>
              <Route index element={<Landing />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
