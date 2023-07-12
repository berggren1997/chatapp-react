import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

interface Props {
  title?: string;
  btnText?: string;
  openModal?: boolean;
}

const Modal: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);

  return (
    <>
      {!isOpen && (
        <div className="m-0 p-0">
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
        </div>
      )}
      {isOpen && (
        <div className="flex flex-1">
          <div className="flex items-center justify-center w-full">
            <div className="rounded-md w-[500px] bg-[#262626] p-4 gap-5 flex flex-col mx-32 justify-center items-center text-center">
              <div className="w-full flex items-center">
                <h2 className="w-full">Create conversation</h2>
                <AiOutlineClose
                  className="w-[27px] h-[27px] bg-zinc-700 rounded-full p-1 hover:cursor-pointer"
                  onClick={() => setIsOpen(false)}
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
              {searchedUsers.length > 0 && (
                <div className="flex w-full items-center bg-[#3b3b3b] p-2 rounded-md">
                  <div className="flex justify-start w-full">
                    <span className="text-sm text-zinc-400 font-semibold">
                      {username}
                    </span>
                  </div>
                  <div className="justify-end">
                    <button className="bg-[#0000FF] text-xs rounded-md p-2">
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="w-full">
                <button
                  className={`bg-[#0000FF] w-full p-3 rounded-md ${
                    username ? "hover:bg-[#0000b5]" : "cursor-not-allowed"
                  }`}
                  disabled={!username}
                  onClick={() => {
                    setSearchedUsers([...searchedUsers, username]);
                    // setUsername("");
                  }}
                >
                  Find user
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
