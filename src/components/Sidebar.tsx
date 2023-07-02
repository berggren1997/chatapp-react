import { BsChatSquareDots } from "react-icons/bs";
import { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    console.log("hi, lets fetch convo list");
  }, []);

  return (
    <div className="hidden md:flex flex-col h-full w-[300px] border-r-[1px] border-zinc-800">
      <div className="flex items-center text-center mt-4 mb-2">
        <div className="flex justify-center w-full">
          <h1 className="text-xl text-[22px]">Conversations</h1>
        </div>
        <div className="flex justify-end mr-2">
          <BsChatSquareDots className="w-[25px] h-[25px] hover:cursor-pointer mr-2" />
        </div>
      </div>
      <div className="border-b-[1px] border-zinc-800"></div>

      {/* FLYTTA UNDERLIGGANDE DEL TILL EN EGEN KOMPONENT */}
      {/* conversation-item wrapper */}
      <div className="flex flex-col mt-6 gap-3">
        <div
          className="flex flex-col items-center justify-between p-3 h-[80px] hover:cursor-pointer 
          hover:bg-zinc-800 mx-2 rounded-md"
        >
          <div className="flex flex-col h-full w-full items-start">
            <div className="flex items-center h-full w-full">
              <div className="bg-red-500 w-[39px] h-[34px] rounded-full"></div>
              <div className="ml-4 flex flex-col items-start w-full">
                <p className="font-semibold text-sm">Hardswap</p>
                <span className="text-sm font-light text-zinc-400">
                  Yo, you need to check t...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between p-3 h-[80px] hover:cursor-pointer 
          hover:bg-zinc-800 mx-2 rounded-md"
        >
          <div className="flex flex-col h-full w-full items-start">
            <div className="flex items-center h-full w-full">
              <div className="bg-red-500 w-[39px] h-[34px] rounded-full"></div>
              <div className="ml-4 flex flex-col items-start w-full">
                <p className="font-semibold text-sm">Restrix</p>
                <span className="text-sm font-light text-zinc-400">
                  Did you see what happ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//border-zinc-800
export default Sidebar;
