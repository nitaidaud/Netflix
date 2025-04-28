import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormData, signupSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const GetStartedForm = () => {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<SignupFormData, "email">>({
    resolver: zodResolver(signupSchema.pick({ email: true })),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: Pick<SignupFormData, "email">) => {
    navigate("/signup", { state: { email: data.email } });
  };
  return (
    <>
    <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row mt-6 space-y-3 sm:space-y-0 sm:space-x-2 w-full max-w-md justify-center"
        >
          <div className="text-left">
            <Input
              error={errors.email?.message}
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="flex-1 px-4 py-3 rounded text-white bg-black/60 border border-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex-none bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </form>
    </>
  )
}

export default GetStartedForm