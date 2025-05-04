import Typography from "@/components/shared/Typography";
import { Input } from "@/components/ui/input";
import { ProfileFormData } from "@/schemas/profile.schema";
import { UseFormRegister } from "react-hook-form";

interface ProfileNameInputProps {
  register: UseFormRegister<ProfileFormData>;
  error?: string;
}

const ProfileNameInput = ({ register, error }: ProfileNameInputProps) => {
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Your Name"
        {...register("name")}
        className="w-full bg-transparent border border-gray-500 text-white px-4 py-3 rounded"
      />

      {error && (
        <Typography color="text-red-500" size="text-sm" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default ProfileNameInput;
