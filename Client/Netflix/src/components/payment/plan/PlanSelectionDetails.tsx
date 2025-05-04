import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { Plan, plans } from "@/data/plans";
import { setSelectedPlanId } from "@/store/slice/payment.slice";
import { useAppDispatch } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";

const PlanSelectionDetails = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    dispatch(setSelectedPlanId(selectedPlan));
    navigate("/payment/step-3");
  };

  return (
    <div className="flex flex-col items-center px-4 text-white text-center w-full max-w-5xl mx-auto mt-20">
      <StepProgressIndicator step={2} total={3} />

      <Typography size="text-2xl" weight="font-bold" className="mb-8">
        Now choose the plan that’s right for you
      </Typography>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 mb-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            selected={selectedPlan === plan}
            onSelect={() => setSelectedPlan(plan)}
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
