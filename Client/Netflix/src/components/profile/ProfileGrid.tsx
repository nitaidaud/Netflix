import IProfile from "@/api/interfaces/profile/IProfile";
import Typography from "@/components/shared/Typography";
import { useAppDispatch } from "@/store/store";
import { loginProfile, deleteProfile, clearProfileErrors } from "@/store/slice/profile.slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import AddProfileCard from "./AddProfileCard";

interface ProfileGridProps {
  profiles: IProfile[];
}

const MAX_PROFILES = 4;

const ProfileGrid = ({ profiles }: ProfileGridProps) => {
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profilesCount = profiles.length;

  const handleLogin = async (profile: IProfile) => {
    try {
      setIsLogging(true);
      await dispatch(loginProfile(profile));
      navigate("/");
    } finally {
      setIsLogging(false);
    }
  };

  const handleDelete = async (profileName: string) => {
    await dispatch(deleteProfile(profileName));
    dispatch(clearProfileErrors());
  };

  const showAddButton = profiles.length < MAX_PROFILES;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-[${profilesCount > 0 ? profilesCount + 1 : "1"}] gap-6 sm:gap-10 place-items-center mx-auto `}>
      {profiles.slice(0, MAX_PROFILES).map((profile) => (
        <ProfileCard
          key={profile.name}
          profile={profile}
          onLogin={handleLogin}
          onDelete={handleDelete}
        />
      ))}

      {showAddButton && <AddProfileCard />}

      {isLogging && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50">
          <Typography
            responsiveSize={{ base: "text-lg", sm: "text-xl", md: "text-3xl" }}
            weight="font-semibold"
            className="text-white text-center"
          >
            Loading your profile...
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProfileGrid;
