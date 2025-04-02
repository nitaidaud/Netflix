import { logoutRequest } from "@/api/api";

const LogoutButton = () => {
  const handleClick = async () => {
    await logoutRequest();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
