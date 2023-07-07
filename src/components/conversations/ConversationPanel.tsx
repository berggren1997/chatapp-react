import { useEffect, useState } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import ConversationPanelFeed from "./ConversationPanelFeed";
import ConversationTypeForm from "../forms/ConversationTypeForm";
import { useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import { fetchConversationsRequest } from "../../api/conversations/getConversations";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import Sidebar from "../Sidebar";

const ConversationPanel = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationResponse>();
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );

  const handleSelectedConversation = (conversation: ConversationResponse) => {
    console.log("clicked convesation: ");
    console.log(conversation);
    setSelectedConversation(conversation);
  };

  const fetchConversationDetails = async () => {
    try {
      console.log("should send request");

      const conversationData = await fetchConversationsRequest();
      setConversations(conversationData);
    } catch (error) {}
  };
  useEffect(() => {
    fetchConversationDetails();
  }, []);
  return (
    <>
      <Sidebar
        conversations={conversations}
        setSelectedConversation={handleSelectedConversation}
      />
      <div className="flex flex-col flex-1">
        <ConversationPanelHeader conversation={selectedConversation} />
        <ConversationPanelFeed conversationId={selectedConversation?.id} />
      </div>
    </>
  );
};

export default ConversationPanel;
