import { useState } from "react";
import PlanSelectionHeader from "@/components/payment/plan/PlanSelectionHeader";
import PlanSelectionDetails from "@/components/payment/plan/PlanSelectionDetails";

const Step2PlanSelection = () => {
  const [stepPart, setStepPart] = useState<"info" | "plans">("info");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
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
