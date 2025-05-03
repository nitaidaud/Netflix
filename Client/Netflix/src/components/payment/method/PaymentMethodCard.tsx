import { ReactNode } from "react";
import Typography from "@/components/shared/Typography";

interface PaymentMethodCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
}

const PaymentMethodCard = ({ icon, label, description, onClick }: PaymentMethodCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-full border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-red-500 transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon}
        <Typography weight="font-semibold">{label}</Typography>
      </div>
      {description && (
        <Typography
          size="text-sm"
          color="text-gray-400"
          className="hidden sm:inline-block"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PaymentMethodCard;
