import { dummyMessageData } from "../../constants/data";
import { useState } from "react";

const ConversationPanelFeed = () => {
  const [lastMessageSentBy, setLastMessageSentBy] = useState<string>("");
  console.log(dummyMessageData);

  const hasPreviousMessage = () => {
    if (lastMessageSentBy) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-1 mt-4 p-3 overflow-y-scroll scroll-auto bg-[#1e1e1e]">
      {/* message container */}
      <div className="flex flex-col mt-3">
        {/*  MESSAGES DUMMY DATA */}
        {dummyMessageData.map((message, idx) => (
          <div
            key={idx}
            className="flex flex-col w-[400px] md:w-[500px] mb-6 text-black"
          >
            <div className="flex flex-row items-center gap-3">
              <div
                className={`${
                  message?.username === "Hardswap"
                    ? "bg-blue-500"
                    : "bg-red-500"
                } h-[32px] w-[32px] rounded-full`}
              ></div>
              <p className="text-[16px]">{message.username}</p>
              <span className="text-xs text-slate-400">Yesterday - 17:15</span>
            </div>
            <div className="flex flex-col ml-11 mt-1">
              <span className="text-[13px] text-slate-300 mb-1">
                {message.message}
                {/* This is the first message from this user! */}
              </span>
              {/* <span className="text-[13px] text-slate-300">
              If the previous message is from the same user, we want to append a
              new span, with the new message like this.
            </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPanelFeed;

// {dummyMessageData.map((message, idx) => (
//   <div
//     key={idx}
//     className="flex flex-col w-[400px] md:w-[500px] mb-6 text-black"
//   >
//     <div className="flex flex-row items-center gap-3">
//       <div
//         className={`${
//           message?.username === "Hardswap"
//             ? "bg-blue-500"
//             : "bg-red-500"
//         } h-[32px] w-[32px] rounded-full`}
//       ></div>
//       <p className="text-[16px]">{message.username}</p>
//       <span className="text-xs text-slate-400">Yesterday - 17:15</span>
//     </div>
//     <div className="flex flex-col ml-11 mt-1">
//       <span className="text-[13px] text-slate-300 mb-1">
//         {message.message}
//         {/* This is the first message from this user! */}
//       </span>
//       {/* <span className="text-[13px] text-slate-300">
//       If the previous message is from the same user, we want to append a
//       new span, with the new message like this.
//     </span> */}
//     </div>
//   </div>
// ))}
