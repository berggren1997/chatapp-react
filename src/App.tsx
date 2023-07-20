import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPanel from "./components/conversations/ConversationPanel";
import AuthenticatedRoute from "./guards/AuthenticatedRoute";
import WrapperPage from "./pages/WrapperPage";
import ConversationPanelFeed from "./components/conversations/ConversationPanelFeed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CallPanel from "./components/calls/CallPanel";
import TempPAGE from "./components/calls/TempPAGE";

const App = () => {
  return (
    <>
      <div className="h-screen flex">
        <Routes>
          <Route path="/" element={<Navigate to="/conversations" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="call" element={<CallPanel />} />
          <Route path="/temp" element={<TempPAGE />} />
          <Route element={<AuthenticatedRoute children={<WrapperPage />} />}>
            <Route path="conversations" element={<ConversationPanel />}>
              <Route path=":id" element={<ConversationPanelFeed />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
