import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPanel from "./components/conversations/ConversationPanel";
import AuthenticatedRoute from "./guards/AuthenticatedRoute";
import ConversationWrapperPage from "./pages/ConversationWrapperPage";
import ConversationPanelFeed from "./components/conversations/ConversationPanelFeed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PeerTest from "./pages/PeerTest";

const App = () => {
  return (
    <>
      <div className="h-screen flex">
        <Routes>
          <Route path="/" element={<Navigate to="/conversations" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="temp" element={<PeerTest />} />
          <Route
            element={
              <AuthenticatedRoute children={<ConversationWrapperPage />} />
            }
          >
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
