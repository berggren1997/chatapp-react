import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbBuildingCommunity } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#1e1e1e]">
      <div className="p-3 mt-4">
        <CgProfile className="w-[40px] h-[40px] hover:cursor-pointer" />
      </div>
      <div className="border-b-[1px] border-zinc-800 w-full mt-[8px]"></div>

      <div className="flex flex-col flex-1 items-center">
        <BsChatDots className="mb-16 mt-16 w-[24px] h-[24px] hover:cursor-pointer" />
        <LiaUserFriendsSolid className="mb-16 w-[24px] h-[24px] hover:cursor-pointer" />
        <TbBuildingCommunity className="mb-16 w-[24px] h-[24px] hover:cursor-pointer" />
        <FiSettings className="mb-16 w-[24px] h-[24px] hover:cursor-pointer" />
      </div>

      <div className="mt-8 items-center flex justify-center mb-4">
        <RiLogoutCircleLine className="w-[30px] h-[30px] hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
