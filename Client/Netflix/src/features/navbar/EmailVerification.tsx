import { newVerificationRequest } from "@/api/api";
import STRINGS from "@/components/shared/STRINGS";
import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useState, useTransition } from "react";

const EmailVerification = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(true);
  const [pending, startTransition] = useTransition();

  const handleEmailVerification = async () => {
    startTransition(async () => {
      try {
        const res = await newVerificationRequest();
        startTransition(() => {
          setMessage(res.message);
          setSuccess(res.success);
          console.log("res", res);
        });
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else setMessage("Something went wrong");
        setSuccess(false);
      }
    });
  };
  return (
    <div
      className={cn(
        "flex justify-center items-center bg-red-600/40 p-2 rounded-md mb-4 relative",
        success && "bg-green-600/40",
      )}
    >
      {!pending && showMsg && (success === null || message === null) && (
        <Typography>
          Your email is not verified, click{" "}
          <Button onClick={handleEmailVerification}>HERE</Button> to verify your
          email
        </Typography>
      )}
      {pending && (
        <Typography>
          Sending verification email... <span className="animate-pulse duration-75">⏳</span>
        </Typography>
      )}
      {success != null && (
          <X className="absolute right-3" onClick={() => setShowMsg(false)} />
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
  );
};

export default EmailVerification;
