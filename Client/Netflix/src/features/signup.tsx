import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Form from "@/components/Shared/Form";
import { SignupFormData, signupSchema } from "@/schemas/auth.schema";
import { signup } from "@/store/Slices/Auth.Slice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupProps = {
  defaultEmail?: string;
};

const Signup: React.FC<SignupProps> = ({ defaultEmail = "" }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

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

  const onSubmit = (data: SignupFormData) => {
    dispatch(signup(data));
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
      {error && (
        <Typography className="text-red-500" size="text-sm">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
      >
        Sign up
      </Button>
    </Form>
  );
};

export default Signup;
