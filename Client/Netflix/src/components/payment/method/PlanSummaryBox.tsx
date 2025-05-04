import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";

interface PlanSummaryBoxProps {
  planLabel: string;
  price: number;
  onChange: () => void;
}

const PlanSummaryBox = ({
  planLabel,
  price,
  onChange,
}: PlanSummaryBoxProps) => {
  return (
    <div className="w-full border border-gray-100 text-gray-100 rounded-md p-4 text-sm flex flex-col sm:flex-row justify-between sm:items-center text-start">
      <div className="flex flex-col items-start justify-start w-full">
        <Typography size="text-sm" weight="font-semibold">
          {price.toLocaleString("he-IL", {
            style: "currency",
            currency: "ILS",
          })}{" "}
          per month
        </Typography>
        <Typography className="ms-1" size="text-xs" color="text-gray-500">
          Plan: {planLabel}
        </Typography>
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
