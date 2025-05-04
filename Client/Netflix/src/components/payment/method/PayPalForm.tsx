import { Button } from "@/components/ui/button";
import { createPayment } from "@/store/slice/payment.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const PayPalForm = () => {
  const { selectedPlan } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();


  const handleCreatePayment = async () => {
    if (!selectedPlan) return;
    const res = await dispatch(
      createPayment({
        currency: selectedPlan.currency,
        plan: selectedPlan.title,
        price: selectedPlan.price,
      }),
    ).unwrap();

    window.location.href = res.approvalLink;
  };

  return (
    <div className="flex flex-col items-center text-center w-full">
      <p className="text-sm text-gray-300 mb-6">
        To finish signup, click <strong>Continue to PayPal</strong> and log in
        to PayPal with your email and password.
      </p>

      <Button
        variant="destructive"
        className="w-full max-w-sm mx-auto text-lg py-6"
        onClick={handleCreatePayment}
      >
        Continue to PayPal
      </Button>
    </div>
  );
};

export default PayPalForm;
