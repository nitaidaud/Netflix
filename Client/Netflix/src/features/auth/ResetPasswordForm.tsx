import { resetPassword } from "@/api/api";
import Form from "@/components/shared/Form";
import CardWrapper from "@/components/ui/auth/CardWrapper";
import { FormError } from "@/components/ui/auth/FormError";
import { FormSuccess } from "@/components/ui/auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LucideLoader } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("token", token);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    setError(undefined);
    setSuccess(undefined);

    if (!token) {
      setError("Invalid token");
      throw new Error("Invalid token");
    }

    startTransition(async () => {
      try {
        const res = await resetPassword(token, data.password);

        if (res.success) {
          setSuccess(res.message);
        } else {
          setError(res.message);
        }
      } catch (error) {
        if (error instanceof AxiosError) setError(error.response?.data.message);
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, token]);

  return (
    <CardWrapper
      headerLabel=""
      title="Reset Password"
      backButtonHref="/signin"
      backButtonLabel="Back to login page"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("password")}
          error={errors.password?.message}
          className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
          disabled={isPending}
        />
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
        <Button
          type="submit"
          className="bg-red-500/40 w-20"
          disabled={isPending}
        >
          {isPending ? (
            <LucideLoader className="animate-spin" color="white" />
          ) : (
            "Send"
          )}
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
