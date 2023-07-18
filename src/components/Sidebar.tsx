import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbBuildingCommunity } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { useState, useEffect } from "react";
import { meRequest } from "../api/auth/me";

const Sidebar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState("");

  const fetchCurrentUser = async () => {
    const userData = await meRequest()
      .then((data) => {
        setCurrentUser(data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <div className="flex flex-col bg-[#1e1e1e]">
      <div className="p-3 mt-4 flex flex-col items-center">
        <CgProfile className="w-[35px] h-[35px] hover:cursor-pointer" />
        {currentUser && (
          <span className="text-xs mt-3 text-zinc-400">{currentUser}</span>
        )}
      </div>
      {/* <div className="border-b-[1px] border-zinc-800 w-full mt-[8px]"></div> */}

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
