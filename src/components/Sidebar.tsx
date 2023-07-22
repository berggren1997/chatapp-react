import { RxAvatar } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbBuildingCommunity } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#1e1e1e]">
      <div className="p-3 mt-4 flex flex-col items-center">
        <RxAvatar className="w-[35px] h-[35px] hover:cursor-pointer" />
      </div>

      <div className="flex flex-col mt-16 gap-4 items-center">
        <BsChatDots className="w-[24px] h-[24px] hover:cursor-pointer" />
        <LiaUserFriendsSolid className="w-[24px] h-[24px] hover:cursor-pointer" />
        <TbBuildingCommunity className="w-[24px] h-[24px] hover:cursor-pointer" />
      </div>

      <div className="mt-8 items-center flex flex-col h-full justify-end gap-6 mb-4">
        <FiSettings className="w-[30px] h-[30px] hover:cursor-pointer" />
        <RiLogoutCircleLine className="w-[30px] h-[30px] hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
