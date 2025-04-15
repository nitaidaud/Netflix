import { logout } from "@/store/slice/auth.slice";
import { useAppDispatch } from "@/store/store";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = async() => {
    await dispatch(logout());
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-4xl"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
