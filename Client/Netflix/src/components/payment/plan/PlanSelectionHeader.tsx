import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Props {
  onNext: () => void;
}

const PlanSelectionHeader = ({ onNext }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-white max-w-2xl w-full mx-auto text-right">
      {/* Red Check Icon */}
      <StepProgressIndicator step={2} total={3} />

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-snug text-center">
        Choose the plan that’s right for you
      </h1>

      {/* Benefit list */}
      <ul className="w-full space-y-4 text-sm md:text-base">
        {[
          "Watch all you want. Ad-free.",
          "Recommendations just for you.",
          "Change or cancel your plan anytime.",
        ].map((item, i) => (
            <li
            key={i}
            className="flex  items-center pb-2"
            >
            <Check className="text-red-600 w-5 h-5 shrink-0 ml-50" />
            <span className="text-white">{item}</span>
          </li>
        ))}
      </ul>

      {/* Next button */}
      <Button onClick={onNext} className="mt-8 w-full max-w-sm text-lg py-6 bg-red-600 hover:bg-red-900 transition duration-200 ease-in-out">
        Next
      </Button>
    </div>
  );
};

export default PlanSelectionHeader;
