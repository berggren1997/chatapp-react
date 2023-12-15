import { RxHamburgerMenu } from "react-icons/rx";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { FiPhoneCall } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

interface Props {
  conversation: ConversationResponse | undefined;
  currentUser: string;
}

const ConversationPanelHeader: React.FC<Props> = ({
  conversation,
  currentUser,
}) => {
  const [creator, setCreator] = useState({
    creator: "",
    creatorId: "",
  });
  const [recipient, setRecipient] = useState({
    recipient: "",
    recipientId: "",
  });

  useEffect(() => {
    if (conversation) {
      if (currentUser === conversation?.conversationDetails?.creator) {
        setRecipient({
          recipient: conversation?.conversationDetails?.recipient,
          recipientId: conversation?.conversationDetails?.recipientId!,
        });
        setCreator({
          creator: conversation?.conversationDetails?.creator,
          creatorId: conversation?.conversationDetails?.creatorId!,
        });
      } else {
        setRecipient({
          recipient: conversation?.conversationDetails?.creator,
          recipientId: conversation.conversationDetails.creatorId!,
        });
        setCreator({
          creator: conversation?.conversationDetails?.recipient,
          creatorId: conversation?.conversationDetails?.recipientId!,
        });
      }
    }
  }, [conversation, currentUser]);

  const handleCallUser = () => {
    alert("soon to be added!");
  };

  return (
    <div>
      <div className="flex items-center border-b-[1px] border-zinc-800 w-full h-[89px] bg-[#1e1e1e]">
        <div className="flex justify-between items-center w-full mx-4">
          <div className="flex items-center">
            {currentUser && conversation && (
              <>
                <div className="bg-red-500 w-[40px] h-[40px] rounded-full text-center"></div>
                <h2 className="ml-4 text-lg">
                  {conversation.conversationDetails.creator === currentUser
                    ? conversation.conversationDetails.recipient
                    : conversation.conversationDetails.creator}
                </h2>
              </>
            )}
          </div>
          {currentUser && conversation && (
            <div className="flex gap-6">
              <FiPhoneCall
                title="Not yet implemented"
                className="hover:cursor-pointer w-[25px] h-[22px]"
                onClick={handleCallUser}
              />
              <BsTrash className="hover:cursor-pointer w-[25px] h-[22px]" />
              <RxHamburgerMenu className="block md:hidden w-[32px] h-[24px] hover:cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// bg-[#1e1e1e]
export default ConversationPanelHeader;
