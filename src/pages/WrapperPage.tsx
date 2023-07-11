import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
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
