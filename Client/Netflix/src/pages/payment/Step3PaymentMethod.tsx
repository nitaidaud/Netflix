import PaymentMethodCard from "@/components/payment/method/PaymentMethodCard";
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";
import Typography from "@/components/shared/Typography";

import { CreditCard } from "lucide-react";
import { BsPaypal } from "react-icons/bs";

const Step3PaymentMethod = () => {
  return (
    <div className="flex flex-col items-center text-center text-white px-4 max-w-2xl mx-auto mt-40">
      <StepProgressIndicator step={3} total={3} />

      <h1 className="text-2xl md:text-3xl font-bold mb-4">Choose your payment method</h1>
<Typography color="text-white" size="text-lg">Your payment is encrypted and you can change your payment method at any time.</Typography>
      
      <p className="text-gray-400 mt-5 mb-8">
        Pay securely, enjoy your content freely. You can cancel anytime online.
      </p>

      <div className="w-full space-y-4">
        <PaymentMethodCard
          icon={<CreditCard className="w-5 h-5" />}
          label="Credit or Debit Card"
          description="Visa, Mastercard, American Express"
        />
        <PaymentMethodCard
          icon={<BsPaypal className="w-5 h-5" />}
          label="PayPal"
        />
      </div>
    </div>
  );
};

export default Step3PaymentMethod;
