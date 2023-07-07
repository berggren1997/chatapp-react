import { BsChatSquareDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ConversationResponse } from "../types/conversations/conversationsTypes";

interface Props {
  conversations: ConversationResponse[];
  setSelectedConversation: (conversationDetails: ConversationResponse) => void;
}

const Sidebar: React.FC<Props> = ({
  conversations,
  setSelectedConversation,
}) => {
  const [clickedConversation, setClickedConversation] = useState("");

  const handleClickedConversation = (conversation: ConversationResponse) => {
    setClickedConversation(conversation.id);
    setSelectedConversation(conversation);
    // Here we also want to do something else with the conversationId, like navigating to conversations/conversationId,
    // and from there on that page, we want to fetch the messages for that conversation
  };

  useEffect(() => {
    console.log("hi, lets fetch convo list");
  }, []);

  if (conversations === undefined || conversations.length === 0)
    return <div>No conversations</div>;

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
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleClickedConversation(conversation)}
            className={`flex flex-col items-center justify-between p-3 h-[80px] hover:cursor-pointer 
          hover:bg-zinc-800 mx-2 rounded-md ${
            conversation.id === clickedConversation && "bg-zinc-800"
          }`}
          >
            <div className="flex flex-col h-full w-full items-start">
              <div className="flex items-center h-full w-full">
                <div className="bg-blue-500 w-[39px] h-[34px] rounded-full"></div>
                <div className="ml-4 flex flex-col items-start w-full">
                  <p className="font-semibold text-sm">
                    {conversation.conversationDetails.recipient}
                  </p>
                  <span className="text-sm font-light text-zinc-400">
                    Yo, you need to check t...
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//border-zinc-800
export default Sidebar;
