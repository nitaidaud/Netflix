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
import CapturePaymentPage from "./pages/payment/CapturePaymentPage";
import PayPalSetupPage from "./pages/payment/PayPalSetupPage";
import Step1AccountSetup from "./pages/payment/Step1AccountSetup";
import Step2PlanSelection from "./pages/payment/Step2PlanSelection";
import Step3PaymentMethod from "./pages/payment/Step3PaymentMethod";
import ProfileChoicePage from "./pages/ProfileChoicePage";
import ResetPassword from "./pages/ResetPassword";
import SignInPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import StreamPage from "./pages/StreamPage";
import TVShowPage from "./pages/TVShowsPage";
import UpdateProfilePage from "./pages/UpdateProfile";
import VerifyEmail from "./pages/VerifyEmail";
import { checkAuth } from "./store/slice/auth.slice";
import { checkUserPayment } from "./store/slice/payment.slice";
import { checkLoggedInProfile } from "./store/slice/profile.slice";
import { useAppDispatch, useAppSelector } from "./store/store";
import LoadingScreen from "./components/shared/LoadingScreen";

// Layouts

function App() {
  const [pending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isProfileLoggedIn = useAppSelector(
    (state) => state.profile.isProfileLoggedIn,
  );
  const { hasPayment, orderStatus } = useAppSelector((state) => state.payment);


  useEffect(() => {
    startTransition(async () => {
      await Promise.allSettled([
        await dispatch(checkAuth()),
        await dispatch(checkLoggedInProfile()),
        await dispatch(checkUserPayment()),
      ]);
    });
  }, [dispatch]);

  if (pending) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          {isAuthenticated ? (
            hasPayment ? (
              isProfileLoggedIn ? (
                <>
                  <Route index element={<Home />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/profiles" element={<ProfileChoicePage />} />
                  <Route
                    path="/profile/create"
                    element={<CreateProfilePage />}
                  />
                  <Route
                    path="/profile/update"
                    element={<UpdateProfilePage />}
                  />
                  <Route path="/my-list" element={<MyListPage />} />
                  <Route path="/movie/stream" element={<StreamPage />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/tv" element={<TVShowPage />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route index element={<ProfileChoicePage />} />
                  <Route
                    path="/profile/create"
                    element={<CreateProfilePage />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )
            ) : orderStatus === "pending" ? (
              <>
                <Route index element={<CapturePaymentPage />} />
                <Route path="/payment/step-1" element={<Step1AccountSetup />} />
                <Route
                  path="/payment/step-2"
                  element={<Step2PlanSelection />}
                />
                <Route
                  path="/payment/step-3"
                  element={<Step3PaymentMethod />}
                />
                <Route path="/payment/paypal" element={<PayPalSetupPage />} />

                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/payment/step-1" />} />
              </>
            ) : (
              <>
                <Route index element={<Step1AccountSetup />} />
                <Route
                  path="/payment/step-2"
                  element={<Step2PlanSelection />}
                />
                <Route
                  path="/payment/step-3"
                  element={<Step3PaymentMethod />}
                />
                <Route path="/payment/paypal" element={<PayPalSetupPage />} />

                <Route path="/verify-email" element={<VerifyEmail />} />
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
