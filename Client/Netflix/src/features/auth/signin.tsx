import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import Form from "@/components/shared/Form";
import { SigninFormData, signinSchema } from "@/schemas/auth.schema";
import { signin } from "@/store/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useState } from "react";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setLoading(true);

    try {
      await dispatch(signin(data));
    } catch (err) {
      console.error("Signin failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
      {error && (
        <Typography className="px-2" color="text-red-500" size="text-sm">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
        disabled={loading}
      >
        {loading ? <LucideLoader className="animate-spin" /> : "Sign In"}
      </Button>
    </Form>
  );
};

export default SigninForm;
