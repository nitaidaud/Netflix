import { logoutUser } from "@/store/slice/auth.slice";
import { logoutProfile } from "@/store/slice/profile.slice";
import { useAppDispatch } from "@/store/store";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    await dispatch(logoutProfile());
    await dispatch(logoutUser());
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-[90%] mx-auto flex items-center justify-center my-2"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
