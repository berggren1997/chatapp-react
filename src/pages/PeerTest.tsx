import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const PeerTest = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerId, setPeerId] = useState<string>("");
  const [peer, setPeer] = useState<Peer>();

  const call = (e: any) => {
    e.preventDefault();
    if (!peer) return peer;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current!.srcObject = stream;
        localVideoRef.current!.play();

        const call = peer.call(peerId, stream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current!.srcObject = remoteStream;
          remoteVideoRef.current!.play();
        });
      });
  };

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", () => {
      setPeer(peer);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          call.answer(mediaStream);
          console.log("call from peer");
        });
    });
    // initializePeer();
  }, []);

  return (
    <div className=" w-full flex items-center justify-center flex-col">
      {peer && <h1>Peer id: {peer.id}</h1>}
      <form onSubmit={call}>
        <label htmlFor="#"></label>
        <input
          className="text-black mr-4 mt-4"
          type="text"
          onChange={(e) => setPeerId(e.target.value)}
          value={peerId}
        />
        <button>Call</button>
      </form>
      <div className="flex">
        <video ref={localVideoRef}></video>
        <video ref={remoteVideoRef}></video>
      </div>
    </div>
  );
};

export default PeerTest;
