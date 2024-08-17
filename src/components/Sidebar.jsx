import { HiHome } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"
import { LuBookMarked } from "react-icons/lu";


const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[10%] rounded flex flex-col justify-around">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 pl-4 cursor-pointer">
          <HiHome size={20} />
          <p className="font-bold">Home</p>
        </button>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LuBookMarked />
            <p className="font-semibold">Liked songs</p>
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          {/* TODO: Add a liked song component */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
