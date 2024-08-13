import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center font-semibold">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" aria-label="Navigate back">
          <img src={assets.arrow_left} alt="" />
        </button>
        <button onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" aria-label="Navigate forward">
          <img src={assets.arrow_right} alt="" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={logout} className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
          Sign out
        </button>
        {/*<p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
          D
        </p>*/}
      </div>
    </div>
  );
};

export default NavBar;
