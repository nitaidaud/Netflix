import IProfile from "@/api/interfaces/profile/IProfile";
import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";

interface Props {
  profile: IProfile;
  onLogin: (profile: IProfile) => void;
  onDelete: (profileName: string) => void;
}

const ProfileCard = ({ profile, onLogin, onDelete }: Props) => {
  return (
    <div className="relative group flex flex-col items-center justify-center">
      <Button
        onClick={() => onLogin(profile)}
        style={{
          backgroundImage: `url(${profile.image || "/images/default-profile.jpg"})`,
        }}
        className="bg-cover bg-center bg-no-repeat w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
      />
      <MinusCircle
        onClick={() => onDelete(profile.name)}
        className="size-[24px] sm:size-[30px] absolute -top-3 -right-3 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        color="red"
      />
      <Typography
        responsiveSize={{ base: "text-sm", sm: "text-base" }}
        className="text-center mt-2"
      >
        {profile.name}
      </Typography>
    </div>
  );
};

export default ProfileCard;
