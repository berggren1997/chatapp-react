import { RiLogoutCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { apiClient } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const signOut = () => {
    apiClient.get("/api/authentication/signout");
    navigate("/login");
  };
  return (
    <div className="flex flex-col bg-[#1a1a1a]">
      <div className="p-3 mt-4 flex flex-col items-center">
        {/* <RxAvatar className="w-[35px] h-[35px] hover:cursor-pointer" /> */}
        <div className="bg-blue-500 w-[35px] h-[35px] rounded-full"></div>
        <span className="text-xs text-[#ccc] mt-2">andreas</span>
      </div>

      <div className="mt-8 items-center flex flex-col h-full justify-end gap-6 mb-4">
        <FiSettings className="w-[24px] h-[24px] hover:cursor-pointer" />
        <RiLogoutCircleLine
          onClick={signOut}
          className="w-[24px] h-[24px] hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
