// import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import { SEND_MESSAGE_EVENT } from "../../constants/signalR";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface Props {
  connection: any;
  conversationId: string;
}

const ConversationTypeForm: React.FC<Props> = ({
  connection,
  conversationId,
}) => {
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    setMessage((prev) => prev + emoji.emoji);
    setEmojiPicker(false);
  };

  const handleSubmit = async (event: any) => {
    // Kontrollera meddelandet innan vi skickar iväg det
    event.preventDefault();
    if (connection) {
      await connection.invoke(SEND_MESSAGE_EVENT, { message, conversationId });
      setMessage("");
    }
  };
  return (
    <>
      {emojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
      <div className="flex relative bg-[#1e1e1e]">
        <form onSubmit={handleSubmit} className="flex relative w-full">
          {/* <AiOutlinePlusCircle className="absolute top-[17px] left-[45px] w-[24px] h-[24px] hover:cursor-pointer" /> */}

          <div className="flex items-center w-full m-4 p-4 rounded-md gap-3 bg-[#1a1a1a]">
            <BsPlusCircle
              className="w-[20px] h-[20px] hover:cursor-pointer"
              onClick={() => setEmojiPicker(!emojiPicker)}
            />
            <input
              type="text"
              placeholder="Send a message.."
              className="border-none focus:outline-none bg-transparent text-[#ccc] w-full"
              onChange={handleMessage}
              value={message}
            />
          </div>
          <button className="hidden" type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default ConversationTypeForm;
