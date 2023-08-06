import { useState } from "react";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  conversations: ConversationResponse[];
  setSelectedConversation: (conversationDetails: ConversationResponse) => void;
  currentUser: string;
  openModal: () => void;
}

const ConversationSidebar: React.FC<Props> = ({
  conversations,
  currentUser,
  openModal,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClickedConversation = (conversation: ConversationResponse) => {
    navigate(`/conversations/${conversation.id}`);
  };

  return (
    <div className="hidden md:flex flex-col h-full w-[300px] border-r-[1px] border-zinc-800 overflow-y-scroll">
      {/* FLYTTA UNDERLIGGANDE DEL TILL EN EGEN KOMPONENT */}
      {/* conversation-item wrapper */}
      <div className="flex flex-col mt-8 gap-3">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex items-center justify-center">
            <input
              className="text-white bg-[#262626] p-3 focus:outline-none rounded-lg w-full mx-1 h-[38px] mb-3 text-sm"
              type="text"
              placeholder="Search Conversations..."
            />
            <AiOutlinePlus
              onClick={openModal}
              className="w-[43px] text-white bg-[#262626] rounded-full p-2 h-[40px] hover:cursor-pointer mx-2 mb-3"
            />
          </div>
          <div className="border-b-[1px] border-zinc-800 w-full mt-1"></div>
        </div>
        {conversations ? (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleClickedConversation(conversation)}
              className={`flex flex-col items-center justify-between p-3 hover:cursor-pointer 
          hover:bg-zinc-800 mx-2 rounded-md ${
            conversation.id === id && "bg-zinc-800"
          }`}
            >
              <div className="flex flex-col h-full w-full items-start">
                <div className="flex items-center h-full w-full">
                  <div className="bg-red-500 w-[39px] h-[34px] rounded-full"></div>
                  <div className="ml-4 flex flex-col items-start w-full">
                    <p className="text-sm">
                      {currentUser === conversation.conversationDetails.creator
                        ? conversation.conversationDetails.recipient
                        : conversation.conversationDetails.creator}
                    </p>
                    <div className="flex items-center gap-1 justify-center">
                      {currentUser ===
                        conversation.lastMessageDetails?.sender && (
                        <span className="text-sm font-light text-zinc-400">
                          You:
                        </span>
                      )}
                      <span className="text-sm font-light text-zinc-400">
                        {conversation.lastMessageDetails?.message?.length > 10
                          ? `${conversation.lastMessageDetails.message.substring(
                              0,
                              20
                            )}...`
                          : conversation.lastMessageDetails?.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No active conversations</h1>
        )}
      </div>
    </div>
  );
};

//border-zinc-800
export default ConversationSidebar;
