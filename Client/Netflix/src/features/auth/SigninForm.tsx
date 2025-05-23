import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import Form from "@/components/shared/Form";
import useToastForm from "@/hooks/useToastify";
import { SigninFormData, signinSchema } from "@/schemas/auth.schema";
import { checkAuth, clearAuthErrors, signin } from "@/store/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useEffect, useTransition } from "react";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const { error: serverError, successMsg } = useAppSelector(
    (state) => state.auth,
  );
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  useToastForm({
    formErrors: errors,
    serverError,
    successMessage: successMsg ?? null,
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      startTransition(async () => {
        await Promise.all([
          await dispatch(signin(data)),
          await dispatch(checkAuth()),
        ]);
      });
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email or phone number"
        {...register("email")}
        error={errors.email?.message}
        className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
      />
      <Input
        type="password"
        placeholder="Password"
        className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
        error={errors.password?.message}
        {...register("password")}
      />
      {/* {error && <FormError message={error} />} */}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
        disabled={isPending}
      >
        {isPending ? <LucideLoader className="animate-spin" /> : "Sign In"}
      </Button>
    </Form>
  );
};

export default SigninForm;
