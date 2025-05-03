import AccountForm from "@/components/payment/account/AccountForm";
import Typography from "@/components/shared/Typography";

interface Step1AccountFormProps {
  onSubmit: () => void;
}

const Step1AccountForm = ({ onSubmit }: Step1AccountFormProps) => {
  return (
    <div className="text-center w-full max-w-xl">
      <Typography size="text-5xl" weight="font-bold" className="mb-4">
        Enter your details
      </Typography>

      <Typography color="text-gray-300" className="mb-8">
        Just a few more steps and you're done! We hate paperwork too.
      </Typography>

      <AccountForm onSubmit={onSubmit} />
    </div>
  );
};

export default Step1AccountForm;
