import { dummyMessageData } from "../../constants/data";
import { useRef } from "react";
import React from "react";

const ConversationPanelFeed = () => {
  const lastMessageRef = useRef<string>("");

  return (
    <div className="flex flex-1 mt-4 p-3 overflow-y-scroll scroll-auto bg-[#1e1e1e]">
      {/* message container */}
      <div className="flex flex-col mt-3">
        {/*  MESSAGES DUMMY DATA */}
        {dummyMessageData.map((message, idx) => {
          const isPreviousMessage = lastMessageRef.current === message.username;
          lastMessageRef.current = message.username;
          console.log(
            "sista meddelandet skickades av:" + lastMessageRef.current
          );
          return (
            <div
              key={idx}
              className="flex flex-col w-[400px] md:w-[500px] text-black mb-2"
            >
              <div className="flex flex-row items-center gap-3">
                {!isPreviousMessage && (
                  <React.Fragment>
                    <div
                      className={`${
                        message?.username === "Hardswap"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      } h-[32px] w-[32px] rounded-full`}
                    ></div>
                    <p className="text-[16px]">{message.username}</p>
                    <span className="text-xs text-slate-400">
                      Yesterday - 17:15
                    </span>
                  </React.Fragment>
                )}
              </div>
              <div className="flex flex-col ml-11 mb-2">
                <span className="text-[13px] text-slate-300">
                  {message.message}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationPanelFeed;
