import { CheckCircle } from "lucide-react";

interface Props {
  step: number;
  total: number;
}

const StepProgressIndicator = ({ step, total }: Props) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <CheckCircle className="text-red-600 w-14 h-14 mb-2" />
      <p className="text-sm text-gray-400">Step {step} of {total}</p>
    </div>
  );
};

export default StepProgressIndicator;