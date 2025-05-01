import IProfile from "@/api/interfaces/IProfile";
import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { useProfiles } from "@/hooks/useProfiles";
import {
  clearProfileErrors,
  deleteProfile,
  loginProfile,
} from "@/store/slice/profile.slice";
import { useAppDispatch } from "@/store/store";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileChoicePage = () => {
  const { data, isLoading, isFetching } = useProfiles();
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (profile: IProfile) => {
    try {
      setIsLogging(true);
      await dispatch(loginProfile(profile));
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLogging(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearProfileErrors());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center size-full">
      <h1 className="text-3xl font-bold mb-4">Choose Your Profile</h1>
      {isLoading || isFetching ? (
        <Typography>Loading...</Typography>
      ) : data && data.profiles.length > 0 ? (
        <div className="flex justify-center items-center gap-10">
          {data.profiles.map((profile, index) => {
            const { image, name } = profile;
            return (
              <div
                className="flex flex-col items-center justify-center relative profile-choose"
                key={image! + index}
              >
                <Button
                  onClick={() => {
                    handleLogin(profile);
                  }}
                  style={{
                    backgroundImage: `${
                      image
                        ? `url(${image})`
                        : "url(/images/default-profile.jpg)"
                    }`,
                  }}
                  className={`bg-cover bg-center bg-no-repeat min-w-[200px] min-h-[200px] p-4 rounded shadow hover:scale-105 transition-transform duration-300 cursor-pointer`}
                ></Button>
                <MinusCircle
                  onClick={() => {
                    dispatch(deleteProfile(name));
                  }}
                  className="size-[30px] absolute delete-profile-btn -top-4 -right-5 bg-transparent opacity-0 duration-300"
                  color="red"
                />
                <h2 className="text-xl text-center">{name}</h2>
              </div>
            );
          })}
          <Link
            to="/profile/create"
            className="bg-white/10 size-full min-w-[200px] max-h-[200px] p-4 rounded shadow hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center mb-auto"
          >
            <PlusCircle
              size={80}
              fill="transparent"
              className="text-gray-400"
            />
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link
            to="/profile/create"
            className="bg-white/10 size-full min-w-[200px] min-h-[200px] p-4 rounded shadow hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center mb-auto"
          >
            <PlusCircle
              size={80}
              fill="transparent"
              className="text-gray-400"
            />
          </Link>
        </div>
      )}
      {isLogging && (
        <div className="absolute top-0 left0 size-full flex items-center justify-center bg-black/40 z-50">
          Logging please wait...
        </div>
      )}
    </div>
  );
};

export default ProfileChoicePage;
