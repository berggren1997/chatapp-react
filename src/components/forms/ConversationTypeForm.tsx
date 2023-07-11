// import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import { SEND_MESSAGE_EVENT } from "../../constants/signalR";

interface Props {
  connection: any;
  conversationId: string;
}

const ConversationTypeForm: React.FC<Props> = ({
  connection,
  conversationId,
}) => {
  const [message, setMessage] = useState("");

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    // Kontrollera meddelandet innan vi skickar iväg det
    event.preventDefault();
    if (connection) {
      await connection.invoke(SEND_MESSAGE_EVENT, { message, conversationId });
      setMessage("");
    }
    // console.log(message);
  };
  return (
    <div className="flex mb-5 relative bg-[#1e1e1e]">
      <form onSubmit={handleSubmit} className="flex relative w-full">
        {/* <AiOutlinePlusCircle className="absolute top-[17px] left-[45px] w-[24px] h-[24px] hover:cursor-pointer" /> */}
        <input
          type="text"
          onChange={handleMessage}
          value={message}
          placeholder="Send a message..."
          className="w-full focus:outline-none mb-6 mx-8 mt-4 outline-none bg-[#1a1a1a] rounded-md 
        text-zinc-300 p-4"
        />
        <button className="hidden" type="submit"></button>
      </form>
    </div>
  );
};

export default ConversationTypeForm;
