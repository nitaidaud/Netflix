import { newVerification } from "@/api/api";
import CardWrapper from "@/components/ui/auth/CardWrapper";
import { FormError } from "@/components/ui/auth/FormError";
import { FormSuccess } from "@/components/ui/auth/FormSuccess";
import { LucideLoader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [searchParams] = useSearchParams();

  const tokenId = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!tokenId) {
      setError("Invalid token");
      return;
    }
    newVerification(tokenId)
      .then((data) => {
        if (data.success) {
          setSuccess(data.message);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.log(`error in verify email: ${error}`);

        setError("Failed to verify email");
      });
  }, [error, success, tokenId]);

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
        {!success && !error && (
          <LucideLoader className="animate-spin" color="white" />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmailForm;
