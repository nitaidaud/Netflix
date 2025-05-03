import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import Step1AccountInfo from "@/components/payment/account/Step1AccountInfo";
import Step1AccountForm from "@/components/payment/account/Step1AccountForm";

const Step1AccountSetup = () => {
  const [stepPart, setStepPart] = useState<"info" | "form">("info");
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate("/payment/step-2");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <StepProgressIndicator step={1} total={3} />
        {stepPart === "info" ? (
          <Step1AccountInfo onNext={() => setStepPart("form")} />
        ) : (
          <Step1AccountForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default Step1AccountSetup;
