import { useEffect } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import ConversationPanelFeed from "./ConversationPanelFeed";
import ConversationTypeForm from "../forms/ConversationTypeForm";
import { useParams } from "react-router-dom";

const ConversationPanel = () => {
  console.log(useParams());
  useEffect(() => {
    console.log("hi");
  }, []);
  return (
    <div className="flex flex-col flex-1 ">
      <ConversationPanelHeader />
      <ConversationPanelFeed />
      <ConversationTypeForm />
    </div>
  );
};

export default ConversationPanel;
