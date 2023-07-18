import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const WrapperPage = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </>
  );
};

export default WrapperPage;
