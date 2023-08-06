import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ConversationWrapperPage = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="flex flex-1">
        <Outlet />
      </div>
    </>
  );
};

export default ConversationWrapperPage;
