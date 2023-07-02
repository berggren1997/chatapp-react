import { RxHamburgerMenu } from "react-icons/rx";

const ConversationPanelHeader = () => {
  return (
    <div className="flex items-center border-b-[1px] border-zinc-800 mx-6 h-[70px]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className="bg-red-500 w-[45px] h-[45px] rounded-full text-center"></div>
          <h2 className="ml-4 text-lg">restrix@gmail.com</h2>
        </div>
        <RxHamburgerMenu className="block md:hidden w-[32px] h-[24px] hover:cursor-pointer" />
      </div>
    </div>
  );
};

// RxHamburgerMenu

export default ConversationPanelHeader;
