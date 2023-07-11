import { useEffect } from "react";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { FaCrown } from "react-icons/fa";

interface Props {
  conversationDetails: ConversationResponse | undefined;
}

const ConversationPanelMembers: React.FC<Props> = ({ conversationDetails }) => {
  useEffect(() => {
    console.log(conversationDetails);
  }, [conversationDetails]);
  return (
    <div className="hidden lg:flex flex-col  mt-[80px] w-[250px]">
      <div className="mt-2 ml-2">
        <p className="text-sm text-zinc-400 uppercase mb-2">
          Members-
          {conversationDetails &&
            Object.keys(conversationDetails!.conversationDetails).length}
        </p>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mt-1 hover:bg-zinc-800 hover:cursor-pointer rounded-md p-2">
            <div className="bg-blue-500 w-[30px] h-[30px] rounded-full"></div>
            <span className="text-sm text-zinc-300">
              {conversationDetails?.conversationDetails.creator}
            </span>
            <FaCrown
              className="h-[20px] w-[15px] text-yellow-400 mb-[0.9px]"
              title="Chat-Creator"
            />
          </div>

          <div className="flex items-center gap-3 mt-1 hover:bg-zinc-800 hover:cursor-pointer rounded-md p-2">
            <div className="bg-red-500 w-[30px] h-[30px] rounded-full"></div>
            <span className="text-sm text-zinc-300">
              {conversationDetails?.conversationDetails.recipient}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanelMembers;
