import IProfile from "@/api/interfaces/IProfile";
import LogoutButton from "@/components/auth/LogoutButton";
import Typography from "@/components/shared/Typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfiles } from "@/hooks/useProfiles";
import { loginProfile } from "@/store/slice/profile.slice";
import { useAppDispatch } from "@/store/store";
import {
  HelpCircle,
  LucideLoader,
  Pencil,
  Triangle,
  User2,
  UserPlus2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type DropdownProfileProps = {
  currentProfile: IProfile | null;
};

const DropdownProfile = ({ currentProfile }: DropdownProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { data, isLoading, isFetching, refetch } = useProfiles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.profileCreated) {
      refetch();
    }
  }, [refetch, state?.profileCreated]);

  const handleChangeProfile = async (profile: IProfile) => {
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

  if (isLogging) {
    return <LucideLoader color="red" className="animate-spin mx-auto" />;
  }

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="profile-dropdown flex items-center cursor-pointer gap-3">
          {currentProfile && (
            <img
              src={currentProfile.image ?? "/images/default-profile.jpg"}
              alt="profile"
              width={100}
              className="rounded-md max-w-[40px] max-h-[40px]"
            />
          )}

          <Triangle
            size={13}
            fill="#fff"
            className={`profile-arrow duration-300 ${
              !isOpen ? "-rotate-180" : ""
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/80 text-white rounded-md shadow-lg border border-gray-700">
        {data ? (
          isLoading || isFetching ? (
            <LucideLoader color="red" className="animate-spin mx-auto" />
          ) : (
            data.profiles.map((profile, index) => (
              <DropdownMenuItem
                key={profile.name + index}
                onClick={() => {
                  handleChangeProfile(profile);
                }}
              >
                <img
                  src={profile.image ?? "/images/default-profile.png"}
                  alt="profile"
                  width={100}
                  className="rounded-md max-w-[40px] max-h-[40px]"
                />
                {profile.name}
              </DropdownMenuItem>
            ))
          )
        ) : (
          <DropdownMenuLabel className="text-center text-red-500">
            No profiles found
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Typography size="text-md" weight="font-semibold">
              Settings
            </Typography>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profiles" className="flex items-center gap-2">
              <Pencil className="size-[25px]" fill="#fff" /> Manage Profiles
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/update" className="flex items-center gap-2">
              <User2 className="size-[25px]" fill="#fff" /> Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/create" className="flex items-center gap-2">
              <UserPlus2 className="size-[25px]" fill="#fff" /> Add Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="size-[25px]" fill="#fff" /> Help Center
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownProfile;
