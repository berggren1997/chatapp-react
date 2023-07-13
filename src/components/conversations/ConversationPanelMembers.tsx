import { useEffect } from "react";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { FaCrown } from "react-icons/fa";
import React from "react";

interface Props {
  conversationDetails: ConversationResponse | undefined;
  currentUser: string;
}

const ConversationPanelMembers: React.FC<Props> = ({
  conversationDetails,
  currentUser,
}) => {
  useEffect(() => {
    console.log(conversationDetails);
  }, [conversationDetails]);

  if (!conversationDetails) return null;

  return (
    <React.Fragment>
      <div className="hidden lg:flex flex-col w-[210px] border-l-[1px] border-zinc-800">
        <div className="mt-4 ml-2">
          <p className="text-sm text-zinc-400 uppercase mb-4 text-center mt-4">
            Members-
            {conversationDetails &&
              Object.keys(conversationDetails!.conversationDetails).length}
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mt-1 hover:bg-zinc-800 hover:cursor-pointer rounded-md p-2">
              <div
                className={`${
                  currentUser ===
                  conversationDetails?.conversationDetails.creator
                    ? "bg-blue-500"
                    : "bg-red-500"
                } w-[30px] h-[30px] rounded-full`}
              ></div>
              <span className="text-sm text-zinc-300">
                {conversationDetails?.conversationDetails.creator}
              </span>
              <FaCrown
                className="h-[20px] w-[15px] text-yellow-400 mb-[3px]"
                title="Chat-Creator"
              />
            </div>

            <div className="flex items-center gap-3 mt-1 hover:bg-zinc-800 hover:cursor-pointer rounded-md p-2">
              <div
                className={`${
                  currentUser ===
                  conversationDetails?.conversationDetails.recipient
                    ? "bg-blue-500"
                    : "bg-red-500"
                } w-[30px] h-[30px] rounded-full`}
              ></div>
              <span className="text-sm text-zinc-300">
                {conversationDetails?.conversationDetails.recipient}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConversationPanelMembers;
