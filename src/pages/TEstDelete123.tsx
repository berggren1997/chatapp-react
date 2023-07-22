import { useEffect, useRef } from "react";

const TEstDelete123 = () => {
  const videoRef = useRef<any>();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((mediaStream) => {
        document.querySelector("video")!.srcObject = mediaStream;
        // Stop the audio stream after 5 seconds
      });
  }, []);
  return (
    <div>
      <video ref={videoRef}></video>
    </div>
  );
};

export default TEstDelete123;
