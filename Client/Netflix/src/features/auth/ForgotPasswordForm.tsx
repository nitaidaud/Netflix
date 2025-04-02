"use client";
import { forgotPassword } from "@/api/api";
import Form from "@/components/shared/Form";
import CardWrapper from "@/components/ui/auth/CardWrapper";
import { FormError } from "@/components/ui/auth/FormError";
import { FormSuccess } from "@/components/ui/auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      try {
        const res = await forgotPassword(data.email);

        if (res.success) {
          setSuccess(res.message);
        } else {
          setError(res.message);
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong!");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel=""
      title="Forgot password"
      backButtonHref="/signin"
      backButtonLabel="Back to login page"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("email")}
          error={errors.email?.message}
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

export default ForgotPasswordForm;
