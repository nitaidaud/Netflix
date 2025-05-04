import PayPalForm from "@/components/payment/method/PayPalForm";
import PlanSummaryBox from "@/components/payment/method/PlanSummaryBox";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import { useAppSelector } from "@/store/store";
import { useNavigate } from "react-router-dom";

const PayPalSetupPage = () => {
  const navigate = useNavigate();

  const { selectedPlan } = useAppSelector((state) => state.payment);

  const handleChangePlan = () =>
    navigate("/payment/step-2", {
      state: { changePlan: true },
    });


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl text-center">
        <StepProgressIndicator step={3} total={3} />

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Set up your PayPal account
        </h1>

        <PlanSummaryBox
          planLabel={selectedPlan?.title || "No Plan Selected"}
          price={selectedPlan?.price || 0}
          onChange={handleChangePlan}
        />

        <PayPalForm />
      </div>
    </div>
  );
};

export default PayPalSetupPage;
