import { Button } from "@/components/ui/button";
import Typography from "@/components/shared/Typography";

interface Step1AccountInfoProps {
  onNext: () => void;
}

const Step1AccountInfo = ({ onNext }: Step1AccountInfoProps) => {
  return (
    <div className="text-center w-full max-w-xl">
      <Typography size="text-5xl" weight="font-bold" className="mb-4">
        Set up your account
      </Typography>

      <Typography size="text-sm" color="text-gray-300" className="mb-8">
        Netflix is personalized for you. <br />
        Complete the payment to start watching Netflix.
      </Typography>

      <Button
        onClick={onNext}
        className="mt-4 w-full max-w-sm text-lg py-6 bg-red-600 hover:bg-red-900 transition duration-200 ease-in-out"
      >
        Next
      </Button>
    </div>
  );
};

export default Step1AccountInfo;
