import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ConversationPanel from "./components/conversations/ConversationPanel";

const App = () => {
  return (
    <div className="h-screen flex">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="conversations" element={<ConversationPanel />} />
      </Routes>
    </div>
  );
};

export default App;
