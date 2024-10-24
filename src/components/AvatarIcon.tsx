import React from "react";

interface AvatarIconProps {
  width?: number;
  height?: number;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ width = 25, height = 25 }) => {
  return (
    <div className="border-[1px] border-zinc-700 p-2 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        //   strokeWidth={1}
        stroke="currentColor"
        className=""
        width={width}
        height={height}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
};

export default AvatarIcon;
