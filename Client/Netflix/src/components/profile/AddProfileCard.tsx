import Typography from "@/components/shared/Typography";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AddProfileCard = () => {
  return (
    <Link to="/profile/create" className="flex flex-col items-center justify-center">
      <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] bg-white/10 rounded shadow hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer">
        <PlusCircle size={50} className="text-gray-400" />
      </div>
      <Typography
        responsiveSize={{ base: "text-sm", sm: "text-base" }}
        className="text-center mt-2 text-gray-300"
      >
        Add Profile
      </Typography>
    </Link>
  );
};

export default AddProfileCard;
