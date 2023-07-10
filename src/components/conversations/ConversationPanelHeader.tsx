import { RxHamburgerMenu } from "react-icons/rx";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { useState, useEffect } from "react";
import { meRequest } from "../../api/auth/me";

interface Props {
  conversation: ConversationResponse | undefined;
  currentUser: string;
}

const ConversationPanelHeader: React.FC<Props> = ({
  conversation,
  currentUser,
}) => {
  return (
    <div className="flex items-center border-b-[1px] border-zinc-800 mx-6 h-[70px]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          {currentUser && conversation && (
            <>
              <div className="bg-red-500 w-[45px] h-[45px] rounded-full text-center"></div>
              <h2 className="ml-4 text-lg">
                {conversation.conversationDetails.creator === currentUser
                  ? conversation.conversationDetails.recipient
                  : conversation.conversationDetails.creator}
              </h2>
            </>
          )}
        </div>
        <RxHamburgerMenu className="block md:hidden w-[32px] h-[24px] hover:cursor-pointer" />
      </div>
    </div>
  );
};
export default ConversationPanelHeader;
