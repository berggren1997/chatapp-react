import { useNavigate } from "react-router-dom";
import { createConversationRequest } from "../../api/conversations/createConversation";
import { FindUserResponse } from "../../types/users/userTypes";
import { useState } from "react";
import Participant from "./Participant";
import { toast } from "react-toastify";

interface Props {
  users: FindUserResponse[];
  closeModal: () => void;
  hubConnection: any;
}

const UserSearchList: React.FC<Props> = ({
  users,
  closeModal,
  hubConnection,
}) => {
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate();

  const createConversation = async () => {
    try {
      const newConversationId = await createConversationRequest(recipient);
      if (newConversationId) {
        hubConnection.invoke("NewConversationEvent", newConversationId);
      }
      closeModal();
      navigate(`/conversations/${newConversationId}`);
    } catch (error: any) {
      console.error(error);
      closeModal();
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex w-full items-center bg-[#3b3b3b] p-2 rounded-md"
        >
          <div className="flex justify-start w-full">
            <span className="text-sm text-zinc-400 font-semibold">
              {user.userName}
            </span>
          </div>
          <div className="justify-end">
            <button
              className="bg-[#0000FF] text-xs rounded-md p-2 w-16"
              onClick={() => setRecipient(user.userName)}
            >
              Select
            </button>
          </div>
        </div>
      ))}
      {recipient && (
        <Participant
          participant={recipient}
          createConversation={createConversation}
          // closeModal={closeModal}
        />
      )}
    </>
  );
};

export default UserSearchList;
