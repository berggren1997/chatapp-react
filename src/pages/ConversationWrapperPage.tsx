import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { meRequest } from "../api/auth/me";
import useSignalR from "../hooks/useSignalR";
import SignalRContext, { SignalRProps } from "../context/SignalRContext";

const ConversationWrapperPage = () => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const messageHub = useSignalR("http://localhost:5247/messageHub");
  const conversationHub = useSignalR("http://localhost:5247/conversationHub");

  const connections: SignalRProps = {
    connections: {
      messageHub,
      conversationHub,
    },
  };

  const currentUserRequest = async () => {
    const user = await meRequest();
    setCurrentUser(user.username);
  };

  useEffect(() => {
    console.log("hej");

    currentUserRequest();
  }, []);
  return (
    <>
      <SignalRContext.Provider value={connections}>
        <Sidebar currentUser={currentUser} />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </SignalRContext.Provider>
    </>
  );
};

export default ConversationWrapperPage;
