import Form from "@/components/shared/Form";
import Typography from "@/components/shared/Typography";
import { FormError } from "@/components/ui/auth/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupFormData, signupSchema } from "@/schemas/auth.schema";
import { signup } from "@/store/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignupProps = {
  defaultEmail?: string;
};

const SignupForm: React.FC<SignupProps> = ({ defaultEmail = "" }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const success = useAppSelector((state) => state.auth.success);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      await dispatch(signup(data));
    } catch (err) {
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
      {error && <FormError message={error} />}
      {success && (
        <Typography color="text-green-800" size="text-sm">
          {success}
        </Typography>
      )}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
        disabled={loading}
      >
        {loading ? <LucideLoader className="animate-spin" /> : "Sign up"}
      </Button>
    </Form>
  );
};

export default SignupForm;
