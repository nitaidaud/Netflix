import PlanSelectionDetails from "@/components/payment/plan/PlanSelectionDetails";
import PlanSelectionHeader from "@/components/payment/plan/PlanSelectionHeader";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Step2PlanSelection = () => {
  const { state } = useLocation();
  const [stepPart, setStepPart] = useState<"info" | "plans">(
    state ? (state.changePlan ? "plans" : "info") : "info",
  );

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 md:px-8 py-10">
      <div className="w-full max-w-6xl text-center">
        {stepPart === "info" ? (
          <PlanSelectionHeader onNext={() => setStepPart("plans")} />
        ) : (
          <PlanSelectionDetails />
        )}
      </div>
    </div>
  );
};

export default Step2PlanSelection;
