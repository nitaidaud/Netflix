import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Typography from "@/components/shared/Typography";

interface Props {
  onNext: () => void;
}

const features = [
  { feature: "Watch all you want. Ad-free." },
  { feature: "Recommendations just for you." },
  { feature: "Change or cancel your plan anytime." },
];

const PlanSelectionHeader = ({ onNext }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-white max-w-2xl w-full mx-auto text-right">
      <StepProgressIndicator step={2} total={3} />

      <Typography
        size="text-5xl"
        weight="font-bold"
        className="mb-6 text-center"
      >
        Choose the plan that’s right for you
      </Typography>

      <ul className="w-full space-y-4 text-left sm:text-center">
        {features.map((item) => (
          <li
            key={item.feature}
            className="w-1/2 min-w-fit mx-auto flex items-center justify-start"
          >
            <Check className="text-red-600 w-5 h-5 shrink-0 mr-3 sm:mr-2 sm:ml-0" />
            <Typography size="text-md">{item.feature}</Typography>
          </li>
        ))}
      </ul>

      <Button
        onClick={onNext}
        className="mt-8 w-full max-w-sm text-lg py-6 bg-red-600 hover:bg-red-900 transition duration-200 ease-in-out"
      >
        Next
      </Button>
    </div>
  );
};

export default PlanSelectionHeader;
