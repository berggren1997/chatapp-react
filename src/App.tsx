import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPanel from "./components/conversations/ConversationPanel";
import AuthenticatedRoute from "./guards/AuthenticatedRoute";
import WrapperPage from "./pages/WrapperPage";
import ConversationPanelFeed from "./components/conversations/ConversationPanelFeed";

const App = () => {
  return (
    <div className="h-screen flex">
      <Routes>
        <Route path="/" element={<Navigate to="/conversations" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<AuthenticatedRoute children={<WrapperPage />} />}>
          <Route path="conversations" element={<ConversationPanel />}>
            <Route path=":id" element={<ConversationPanelFeed />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
