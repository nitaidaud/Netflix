import Step1AccountInfo from "@/components/payment/account/Step1AccountInfo";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import { useNavigate } from "react-router-dom";

const Step1AccountSetup = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate("/payment/step-2");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <StepProgressIndicator step={1} total={3} />

        <Step1AccountInfo onNext={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Step1AccountSetup;
