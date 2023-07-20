import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  callingUsername?: string;
  callingUserId?: string;
  callsConnection?: any;
  closeCallModal?: () => void;
}

const OutgoingCall: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-[350px]">
      <div className="flex flex-col w-full bg-zinc-800 rounded-md text-black gap-3 items-center justify-center p-4">
        <div className="flex mb-4 w-full items-center justify-center">
          <div className="flex gap-2 items-center">
            <p className="text-zinc-400 text-lg">Calling:</p>
            <p className="text-zinc-200">andreas</p>
            {/* <div className="bg-red-500 w-[35px] h-[35px] rounded-full"></div> */}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 w-full mt-4">
          <MdCallEnd className="w-[40px] h-[40px] bg-red-400 p-2 rounded-full hover:cursor-pointer" />
          <p className="text-zinc-400">Cancel call</p>
        </div>
      </div>
    </div>
  );
};

export default OutgoingCall;
