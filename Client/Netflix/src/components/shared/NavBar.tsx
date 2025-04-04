import { newVerificationRequest } from "@/api/api";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/Store";
import { X } from "lucide-react";
import { useState, useTransition } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import STRINGS from "./STRINGS";
import Typography from "./Typography";

type NavBarProps = {
  children: React.ReactNode;
  className?: string;
};

const NavBar: React.FC<NavBarProps> = ({ children, className = "" }) => {
  const authState = useAppSelector((state) => state.auth);

  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(true);
  const [pending, startTransition] = useTransition();
  const { state } = useLocation();
  const cameFromVerifyEmail = (state?.cameFromVerifyEmail as boolean) || false;

  console.log("cameFromVerifyEmail", cameFromVerifyEmail);

  const handleEmailVerification = async () => {
    startTransition(async () => {
      const res = await newVerificationRequest();
      setMessage(res.message);
      setSuccess(res.success);
      console.log("res", res);
    });
  };

  return (
    <nav
      className={`w-full bg-gradient-to-b from-black to-transparent text-white p-4 ${className}`}
    >
      {cameFromVerifyEmail && showMsg && (
        <div className="flex justify-center items-center bg-green-600/40 p-2 rounded-md mb-4 relative">
          <Typography className="text-green-500">
            {STRINGS.emailVerified}
          </Typography>
          <X className="absolute right-3" onClick={() => setShowMsg(false)} />
        </div>
      )}
      {!authState.emailVerified && authState.isAuthenticated && (
        <div
          className={cn(
            "flex justify-center items-center bg-red-600/40 p-2 rounded-md mb-4 relative",
            success && "bg-green-600/40",
          )}
        >
          {!pending && showMsg && (!success || !message) && (
            <Typography>
              Your email is not verified, click{" "}
              <Button onClick={handleEmailVerification}>HERE</Button> to verify
              your email
            </Typography>
          )}
          {pending && (
            <Typography>
              Sending verification email...{" "}
              <span className="animate-spin">⏳</span>
            </Typography>
          )}
          {success != null && (
              <X
                className="absolute right-3"
                onClick={() => setShowMsg(false)}
              />
            ) &&
            (success === false ? (
              <Typography className="text-red-500">
                {message} {STRINGS.errorMsg}
              </Typography>
            ) : (
              success === true && (
                <Typography className="text-green-500">
                  {message} {STRINGS.successMsg}
                </Typography>
              )
            ))}
        </div>
      )}
      {children}
    </nav>
  );
};

export default NavBar;
