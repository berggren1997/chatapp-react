import {
  BsThreeDots,
  BsPinAngle,
  BsMic,
  BsMicMute,
  BsCamera,
  BsCameraVideo,
  BsCameraVideoOff,
} from "react-icons/bs";
import { FiMonitor, FiCameraOff } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { LuMonitorOff } from "react-icons/lu";
import { useState } from "react";

interface Props {
  user: string;
}

const CallPanel: React.FC<Props> = ({ user }) => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      {/* PARTICIPANTS */}
      <div className="flex flex-col items-center justify-center w-full gap-5 bg-zinc-900">
        <div className="flex flex-wrap justify-center gap-5">
          {/* {user && ( */}
          <div className="flex items-center justify-center mt-12 mb-10">
            <div className="bg-blue-500 w-[180px] h-[184px] rounded-full relative"></div>
          </div>
          {/* )} */}

          <div className="flex items-center justify-center mt-12 mb-10">
            <div className="bg-red-500 w-[180px] h-[184px] rounded-full relative"></div>
          </div>
        </div>

        <div className="rounded-md w-[720px] bg-zinc-900 flex flex-col mb-3">
          <div className="flex items-center justify-center gap-8 mt-8 mb-2">
            {micOn ? (
              <BsMic
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setMicOn(false);
                }}
              />
            ) : (
              <BsMicMute
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setMicOn(true);
                }}
              />
            )}
            {cameraOn ? (
              <BsCameraVideo
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setCameraOn(false);
                }}
              />
            ) : (
              <BsCameraVideoOff
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setCameraOn(true);
                }}
              />
            )}
            {screenOn ? (
              <FiMonitor
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setScreenOn(false);
                }}
              />
            ) : (
              <LuMonitorOff
                className="w-[30px] h-[30px] hover:cursor-pointer"
                onClick={() => {
                  setScreenOn(true);
                }}
              />
            )}
            <RxExit
              className="w-[40px] h-[40px] hover:cursor-pointer text-red bg-red-500 p-2 rounded-lg"
              title="Leave room"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPanel;
