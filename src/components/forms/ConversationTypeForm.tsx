// import { AiOutlinePlusCircle } from "react-icons/ai";
const ConversationTypeForm = () => {
  return (
    <div className="flex relative bg-[#1e1e1e]">
      {/* <AiOutlinePlusCircle className="absolute top-[17px] left-[45px] w-[24px] h-[24px] hover:cursor-pointer" /> */}
      <input
        type="text"
        placeholder="Send a message..."
        className="w-full focus:outline-none mb-6 mx-8 mt-4 outline-none bg-[#1a1a1a] rounded-md 
        text-zinc-300 p-4"
      />
    </div>
  );
};

export default ConversationTypeForm;
