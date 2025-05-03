import { Button } from "@/components/ui/button";

interface PlanSummaryBoxProps {
  planLabel: string;
  price: string;
  onChange: () => void;
}

const PlanSummaryBox = ({ planLabel, price, onChange }: PlanSummaryBoxProps) => {
  return (
    <div className="w-full bg-gray-100 text-black rounded-md p-4 text-sm flex flex-col sm:flex-row justify-between sm:items-center text-left">
  <div>
    <p className="text-sm font-semibold">{price} per month</p>
    <p className="text-xs text-gray-500">Plan: {planLabel}</p>
  </div>
  <Button
    variant="link"
    onClick={onChange}
    className="text-blue-600 text-sm p-0 h-auto mt-2 sm:mt-0"
  >
    Change
  </Button>
</div>

  );
};

export default PlanSummaryBox;
