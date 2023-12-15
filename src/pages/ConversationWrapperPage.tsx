import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { meRequest } from "../api/auth/me";

const ConversationWrapperPage = () => {
  const [currentUser, setCurrentUser] = useState<string>("");

  const currentUserRequest = async () => {
    const user = await meRequest();
    setCurrentUser(user.username);
  };

  useEffect(() => {
    currentUserRequest();
  }, []);
  return (
    <>
      <Sidebar currentUser={currentUser} />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </>
  );
};

export default ConversationWrapperPage;
