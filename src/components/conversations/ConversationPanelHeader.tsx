import { RxHamburgerMenu } from "react-icons/rx";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { FiPhoneCall } from "react-icons/fi";
import { BsTrash, BsCameraVideo } from "react-icons/bs";

interface Props {
  conversation: ConversationResponse | undefined;
  currentUser: string;
}

const ConversationPanelHeader: React.FC<Props> = ({
  conversation,
  currentUser,
}) => {
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
                title="Soon to be added. Voicechat"
                className="hover:cursor-pointer w-[25px] h-[22px]"
              />
              <BsCameraVideo
                title="Will maybe be added. Videochat"
                className="hover:cursor-pointer w-[25px] h-[22px]"
              />
              <BsTrash
                title="Soon to be added. Delete conversation"
                className="hover:cursor-pointer w-[25px] h-[22px]"
              />
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
