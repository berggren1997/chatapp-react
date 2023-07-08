import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ConversationPanel from "../components/conversations/ConversationPanel";

const WrapperPage = () => {
  return (
    <>
      <Outlet />
      {/* <Sidebar /> */}
      {/* <ConversationPanel /> */}
    </>
  );
};

export default WrapperPage;
