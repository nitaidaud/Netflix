import Form from "@/components/shared/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToastForm from "@/hooks/useToastify";
import { SignupFormData, signupSchema } from "@/schemas/auth.schema";
import { clearAuthErrors, signup } from "@/store/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type SignupProps = {
  defaultEmail?: string;
};

const SignupForm: React.FC<SignupProps> = ({ defaultEmail = "" }) => {
  const dispatch = useAppDispatch();
  const { error: serverError, successMsg } = useAppSelector(
    (state) => state.auth,
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  useToastForm({
    formErrors: errors,
    serverError,
    successMessage: successMsg ?? null,
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await dispatch(signup(data));
    } catch (err) {
      console.error("Signup failed:", err);
    } finally {
      setIsLoading(false);
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
        type="text"
        placeholder="Name"
        {...register("name")}
        error={errors.name?.message}
        className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
      />
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
        {...register("password")}
        error={errors.password?.message}
        className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
      />
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
        disabled={isLoading}
      >
        {isLoading ? <LucideLoader className="animate-spin" /> : "Sign up"}
      </Button>
    </Form>
  );
};

export default SignupForm;
