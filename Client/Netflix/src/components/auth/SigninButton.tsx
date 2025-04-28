import { useNavigate } from "react-router-dom";


const SigninButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-4xl"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
