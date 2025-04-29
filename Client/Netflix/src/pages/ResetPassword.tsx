import Container from "@/components/shared/Container";
import ResetPasswordForm from "@/features/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center">
      <Container>
        <div className=" max-w-sm bg-black/80 text-white p-10 rounded-md space-y-6 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Reset Your Password</h1>
          <ResetPasswordForm />
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
