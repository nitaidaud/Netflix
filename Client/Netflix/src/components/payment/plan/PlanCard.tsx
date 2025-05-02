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
          transition-transform duration-200 ease-in-out w-full max-w-xs min-h-[550px]
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
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{resolution}</p>
        <p className="text-2xl font-bold text-white mb-4">{price}</p>
        <div className="flex flex-col divide-y divide-gray-700 text-sm text-white">
          {features.map((item, i) => (
            <div key={i} className="py-3">
              <span className="text-gray-400 font-semibold">{item.label}:</span>{" "}
              <span className="text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
