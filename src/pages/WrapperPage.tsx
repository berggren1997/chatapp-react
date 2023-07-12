import { Outlet } from "react-router-dom";

const WrapperPage = () => {
  return (
    <div className="flex flex-1">
      <Outlet />
      {/* <Sidebar /> */}
      {/* <ConversationPanel /> */}
    </div>
  );
};

export default WrapperPage;
