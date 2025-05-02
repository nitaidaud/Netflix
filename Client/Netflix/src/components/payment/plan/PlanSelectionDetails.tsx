import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PlanCard from "./PlanCard";
import { plans } from "@/data/plans";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";

const PlanSelectionDetails = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/payment/step-3");
  };

  return (
    <div className="flex flex-col items-center px-4 text-white text-center w-full max-w-5xl mx-auto mt-20">
      <StepProgressIndicator step={2} total={3} />

      <h2 className="text-xl md:text-2xl mb-8">
        Now choose the plan that’s right for you
      </h2>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            selected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
          />
        ))}
      </div>

      <Button
        className="mt-8 w-full max-w-sm text-lg py-6 bg-red-600 hover:bg-red-900 transition duration-200 ease-in-out"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default PlanSelectionDetails;
