import PaymentMethodCard from "@/components/payment/method/PaymentMethodCard";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import Typography from "@/components/shared/Typography";
import { useAppSelector } from "@/store/store";
import { LucideLoader } from "lucide-react";
import { BsPaypal } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Step3PaymentMethod = () => {
  const { isLoading } = useAppSelector((state) => state.payment);

  const navigate = useNavigate();

  // const dispatch = useAppDispatch();

  // const handleCreatePayment = async () => {
  //   if (!selectedPlan) return;
  //   const res = await dispatch(
  //     createPayment({
  //       currency: selectedPlan.currency,
  //       plan: selectedPlan.title,
  //       price: selectedPlan.price,
  //     }),
  //   ).unwrap();

  //   window.location.href = res.approvalLink;
  // };

  return (
    <div className="flex flex-col items-center text-center text-white px-4 max-w-2xl mx-auto mt-40">
      <StepProgressIndicator step={3} total={3} />

      <Typography size="text-5xl" weight="font-bold" className="mb-4">
        Choose your payment method
      </Typography>

      <Typography color="text-white" size="text-lg">
        Your payment is encrypted and you can change your payment method at any
        time.
      </Typography>

      <Typography color="text-gray-400" size="text-md" className="mt-5 mb-8">
        Pay securely, enjoy your content freely. You can cancel anytime online.
      </Typography>

      <div className="w-full space-y-4 mb-8">
        <PaymentMethodCard
          icon={
            isLoading ? (
              <LucideLoader className="animate-spin" />
            ) : (
              <BsPaypal className="w-5 h-5" />
            )
          }
          label="PayPal"
          // onClick={handleCreatePayment}
          onClick={() => navigate("/payment/paypal")}
        />
      </div>
    </div>
  );
};

export default Step3PaymentMethod;
