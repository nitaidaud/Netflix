import { ReactNode } from "react";

interface PaymentMethodCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
}

const PaymentMethodCard = ({ icon, label, description }: PaymentMethodCardProps) => {
  return (
    <div className="flex items-center justify-between w-full border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-red-500 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-white font-medium">{label}</span>
      </div>
      {description && (
        <span className="text-sm text-gray-400 hidden sm:inline-block">{description}</span>
      )}
    </div>
  );
};

export default PaymentMethodCard;
