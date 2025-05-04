
import ProfileGrid from "@/components/profile/ProfileGrid";
import ProfileLoadingAnimation from "@/components/profile/ProfileLoadingAnimation";
import Typography from "@/components/shared/Typography";
import { useProfiles } from "@/hooks/useProfiles";


const ProfileChoicePage = () => {
  const { data, isLoading, isFetching } = useProfiles();
  const profiles = data?.profiles ?? [];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black px-4 py-8">
      <Typography
        responsiveSize={{ base: "text-xl", sm: "text-2xl", md: "text-3xl" }}
        weight="font-bold"
        className="mb-6 text-center"
      >
        Choose Your Profile
      </Typography>

      {(isLoading || isFetching) ? (
        <ProfileLoadingAnimation />
      ) : (
        <ProfileGrid profiles={profiles} />
      )}
    </div>
  );
};

export default ProfileChoicePage;
