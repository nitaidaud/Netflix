import { useProfile } from "@/hooks/useProfiles";
import { Fragment } from "react/jsx-runtime";

const ProfileChoicePage = () => {
  const { data, isLoading } = useProfile();

  return (
    <div className="flex flex-col items-center justify-center size-full">
      <h1 className="text-3xl font-bold mb-4">Choose Your Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.profiles.length > 0 ? (
        <ul className="space-y-4">
          {data.profiles.map((profile) => (
            <Fragment key={profile.image}>
              <li
                className={`${
                  profile.image
                    ? `bg-[url(${profile.image})]`
                    : "bg-[url(/images/default-profile.jpg)]"
                } bg-contain bg-center bg-no-repeat min-w-[200px] min-h-[200px] p-4 rounded shadow hover:scale-105 transition-transform duration-300 cursor-pointer`}
              ></li>
              <h2 className="text-xl text-center">{profile.name}</h2>
            </Fragment>
          ))}
        </ul>
      ) : (
        <p>No profiles available. Please create a profile.</p>
      )}
    </div>
  );
};

export default ProfileChoicePage;
