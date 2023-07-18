import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { findUserRequest } from "../../api/users/findUserRequest";
import { FindUserResponse } from "../../types/users/userTypes";
import UserSearchList from "./UserSearchList";

interface Props {
  closeModal: () => void;
  hubConnection: any;
}

const CreateConversationContent: React.FC<Props> = ({
  closeModal,
  hubConnection,
}) => {
  const [username, setUsername] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<FindUserResponse[]>([]);

  const handleSearchUser = async () => {
    try {
      const users = await findUserRequest(username);
      setSearchedUsers(users!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-md bg-[#262626] p-4 gap-5 flex flex-col mx-32 justify-center items-center w-[500px] text-center">
      <div className="w-full flex items-center">
        <h2 className="w-full">Create conversation</h2>
        <AiOutlineClose
          className="w-[27px] h-[27px] bg-zinc-700 rounded-full p-1 hover:cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <div className="w-full">
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="w-full p-3 bg-inherit border-[1px] border-zinc-700 rounded-md focus:outline-none"
          type="text"
          placeholder="Search username"
        />
      </div>
      {searchedUsers && searchedUsers.length > 0 && (
        <UserSearchList
          users={searchedUsers}
          closeModal={closeModal}
          hubConnection={hubConnection}
        />
      )}

      <div className="w-full">
        <button
          className={`bg-[#0000FF] w-full p-3 rounded-md ${
            username ? "hover:bg-[#0000b5]" : "cursor-not-allowed"
          }`}
          disabled={!username}
          onClick={handleSearchUser}
        >
          Find user
        </button>
      </div>
    </div>
  );
};

export default CreateConversationContent;
