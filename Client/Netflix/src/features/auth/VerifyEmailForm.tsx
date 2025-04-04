import CardWrapper from "@/components/ui/auth/CardWrapper";
import { FormError } from "@/components/ui/auth/FormError";
import { FormSuccess } from "@/components/ui/auth/FormSuccess";
import { verifyEmail } from "@/store/slice/auth.slice";
import { useAppDispatch } from "@/store/Store";
import { LucideLoader } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  const tokenId = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!tokenId) {
      setError("Invalid token");
      return;
    }
    startTransition(async () => {
      try {
        const res = await dispatch(verifyEmail(tokenId));
        if (verifyEmail.fulfilled.match(res)) {
          if (res.payload.success) {
            console.log("success verify");
            setSuccess(res.payload.message);

            navigate("/", {
              state: { cameFromVerifyEmail: true },
            });
            return;
          } else {
            setError(res.payload.message);
          }
        } else {
          setError(res.payload || "Failed to verify email");
        }
      } catch (error) {
        console.log(`error in verify email: ${error}`);

        setError("Failed to verify email");
      }
    });
  }, [dispatch, error, navigate, success, tokenId]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      title="Confirming now..."
      backButtonHref="/signin"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {pending && <LucideLoader className="animate-spin" color="white" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmailForm;
