import { IoMdCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  callingUsername?: string;
  callingUserId?: string;
  callsConnection?: any;
  closeCallModal: () => void;
}

const IncomingCall: React.FC<Props> = ({
  callingUsername,
  callingUserId,
  callsConnection,
  closeCallModal,
}) => {
  const navigate = useNavigate();

  const handleAnswerCall = () => {
    if (callsConnection) {
      callsConnection.invoke("AnswerCall", callingUserId);
      closeCallModal();
      navigate("/call");
    }
  };

  const handleDeclineCall = () => {
    if (callsConnection) {
      callsConnection.invoke("DeclineCall", callingUserId);
      closeCallModal();
    }
  };
  return (
    <div className="flex w-[350px]">
      <div className="flex flex-col w-full bg-zinc-800 rounded-md text-black gap-3 items-center justify-center p-4">
        <div className="flex mb-4 w-full items-center justify-center">
          <div className="flex gap-2 items-center">
            <div className="bg-red-500 w-[45px] h-[45px] rounded-full"></div>

            <p className="text-zinc-200">{callingUsername}</p>
            <p className="text-zinc-400">is calling you</p>
          </div>
        </div>
        <div className="flex justify-center gap-8 w-full mt-4">
          <IoMdCall
            onClick={handleAnswerCall}
            className="w-[50px] h-[50px] bg-green-400 p-3 rounded-full hover:cursor-pointer"
          />
          <MdCallEnd
            onClick={handleDeclineCall}
            className="w-[50px] h-[50px] bg-red-400 p-3 rounded-full hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
