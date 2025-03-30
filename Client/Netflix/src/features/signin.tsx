import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import Form from "@/components/shared/Form";
import { SigninFormData, signinSchema } from "@/schemas/auth.schema";
import { signin } from "@/store/Slices/Auth.Slice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { zodResolver } from "@hookform/resolvers/zod";

// const Signin: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Signing in with", { email, password });
//   };

//   return (
//     <div >
// <form onSubmit={handleSubmit} className="space-y-4">
//   <input
//     type="email"
//     placeholder="Email or phone number"
//     className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />
//   <input
//     type="password"
//     placeholder="Password"
//     className="w-full bg-transparent border border-gray-500 focus:border-white focus:outline-none text-white px-4 py-3 rounded placeholder-gray-400"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
// </form>
//     </div>
//   );
// };

const Signin = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninFormData) => {
    dispatch(signin(data));
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
        <Typography className="text-red-500" size="text-sm">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-3 rounded"
      >
        Sign In
      </Button>
    </Form>
  );
};

export default Signin;
