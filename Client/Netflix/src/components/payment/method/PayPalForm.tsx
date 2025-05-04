import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { createPayment } from "@/store/slice/payment.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const PayPalForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPlan } = useAppSelector((state) => state.payment);

  const dispatch = useAppDispatch();

  const handleCreatePayment = async () => {
    if (!selectedPlan) return;
    try {
      setIsLoading(true);
      const res = await dispatch(
        createPayment({
          currency: selectedPlan.currency,
          plan: selectedPlan.title,
          price: selectedPlan.price,
        }),
      ).unwrap();
      window.location.href = res.approvalLink;
    } catch (error) {
      console.error("Create Payment Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center w-full gap-6">
      <Typography size="text-sm" color="text-gray-300" className="mt-3">
        To finish signup, click <strong>Continue to PayPal</strong> and log in
        to PayPal with your email and password.
      </Typography>

      {isLoading ? (
        <Loader2Icon className="w-12 h-12 animate-spin text-red-600 mx-auto" />
      ) : (
        <Button
          variant="destructive"
          className="w-full max-w-sm mx-auto text-lg py-6"
          onClick={handleCreatePayment}
        >
          Continue to PayPal
        </Button>
      )}
    </div>
  );
};

export default PayPalForm;
