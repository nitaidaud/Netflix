import Typography from "@/components/shared/Typography";

interface PlanCardProps {
  title: string;
  resolution: string;
  price: string;
  features: {
    label: string;
    value: string;
  }[];
  isMostPopular?: boolean;
  selected?: boolean;
  onSelect: () => void;
}

const PlanCard = ({
  title,
  resolution,
  price,
  features,
  isMostPopular = false,
  selected = false,
  onSelect,
}: PlanCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col justify-between p-6 border rounded-lg cursor-pointer 
        transition-transform duration-200 ease-in-out w-full max-w-[360px] min-h-[550px]
        ${selected ? "border-red-500 ring-2 ring-red-500" : "border-gray-700"}
        ${
          isMostPopular
            ? "bg-gradient-to-b from-red-700 to-purple-700 text-white"
            : "bg-zinc-900 text-white"
        }
        text-left hover:border-red-500 hover:shadow-lg hover:scale-[1.02]`}
    >
      <div>
        {isMostPopular && (
          <div className="text-xs bg-red-500 text-white font-semibold py-1 px-2 rounded-full w-fit mb-2">
            Most Popular
          </div>
        )}

        <Typography size="text-xl" weight="font-bold" className="mb-1">
          {title}
        </Typography>

        <Typography size="text-sm" color="text-gray-300" className="mb-4">
          {resolution}
        </Typography>

        <Typography size="text-2xl" weight="font-bold" className="mb-4">
          {price}
        </Typography>

        <div className="flex flex-col divide-y divide-gray-700 text-sm text-white">
          {features.map((item, i) => (
            <div key={i} className="py-3">
              <Typography
                size="text-sm"
                weight="font-semibold"
                color="text-gray-400"
                className="inline"
              >
                {item.label}:
              </Typography>{" "}
              <Typography size="text-sm" color="text-white" className="inline">
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
