import {
  BsThreeDots,
  BsPinAngle,
  BsMic,
  BsMicMute,
  BsCamera,
} from "react-icons/bs";
import { FiMonitor, FiCameraOff } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { LuMonitorOff } from "react-icons/lu";
import { useState } from "react";

const CallPanel: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);

  return (
    <div className="w-full flex flex-col items-center overflow-y-scroll">
      {/* PARTICIPANTS */}
      <div className="flex flex-col flex-1 items-center justify-center w-full gap-5 bg-zinc-950">
        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex flex-col w-[350px] bg-zinc-800 rounded-md">
            <div className="flex items-center justify-between mx-4 mt-2">
              <BsPinAngle className="w-[20px] h-[20px]" />
              <BsThreeDots className="w-[20px] h-[20px]" />
            </div>

            <div className="flex items-center justify-center mt-12 mb-10">
              <div className="bg-slate-300 w-[80px] h-[84px] rounded-full relative">
                <span className="absolute top-7 left-[31px] text-red-500 text-2xl font-bold">
                  H
                </span>
              </div>
            </div>

            <div className="ml-4 mt-6 mb-4 flex">
              <p className="text-slate-200 bg-slate-900 p-2 text-xs rounded-md">
                hardswap
              </p>
            </div>
          </div>

          <div className="border-2 border-green-500 flex flex-col w-[350px] bg-zinc-800 rounded-md">
            <div className="flex items-center justify-between mx-4 mt-2">
              <BsPinAngle className="w-[20px] h-[20px]" />
              <BsThreeDots className="w-[20px] h-[20px]" />
            </div>

            <div className="flex items-center justify-center mt-12 mb-10">
              <div className="bg-slate-300 w-[80px] h-[84px] rounded-full relative">
                <span className="absolute top-7 left-[31px] text-red-500 text-2xl font-bold">
                  A
                </span>
              </div>
            </div>

            <div className="ml-4 mt-6 mb-4 flex">
              <p className="text-slate-200 bg-slate-900 p-2 text-xs rounded-md">
                andreas
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-md w-[720px] mt-8 bg-zinc-900 flex flex-col">
          <div className="flex items-center justify-center mt-2">
            <p className="text-sm text-zinc-400 mt-2">
              In conversation with{" "}
              <span className="text-slate-200">andreas</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 mb-2">
            {micOn ? (
              <BsMic
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setMicOn(false);
                }}
              />
            ) : (
              <BsMicMute
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setMicOn(true);
                }}
              />
            )}
            {cameraOn ? (
              <BsCamera
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setCameraOn(false);
                }}
              />
            ) : (
              <FiCameraOff
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setCameraOn(true);
                }}
              />
            )}
            {screenOn ? (
              <FiMonitor
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setScreenOn(false);
                }}
              />
            ) : (
              <LuMonitorOff
                className="w-[22px] h-[22px] hover:cursor-pointer"
                onClick={() => {
                  setScreenOn(true);
                }}
              />
            )}
            <RxExit
              className="w-[34px] h-[34px] ml-4 hover:cursor-pointer text-red bg-red-500 p-2 rounded-lg"
              title="Leave room"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPanel;
