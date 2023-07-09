import { useEffect, useState } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import { Outlet, useParams } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const handleSelectedConversation = (conversation: ConversationResponse) => {
    setSelectedConversation(conversation);
  };

  const getSelectedConversation = (
    conversationId: string
  ): ConversationResponse | undefined => {
    if (id) {
      const selectedConvo = conversations.filter((x) => x.id === id);
      return selectedConvo[0];
    }
  };

  const fetchCurrentUser = async () => {
    await meRequest()
      .then(({ username }) => {
        setCurrentUser(username);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchUserConversations = async () => {
    try {
      const conversationData = await fetchConversationsRequest();
      setConversations(conversationData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserConversations();
    fetchCurrentUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Sidebar
        conversations={conversations}
        setSelectedConversation={handleSelectedConversation}
        currentUser={currentUser}
      />
      <div className="flex flex-col flex-1">
        <ConversationPanelHeader
          conversation={getSelectedConversation(id || "")}
          currentUser={currentUser}
        />
        <Outlet />
      </div>
    </>
  );
};

export default ConversationPanel;
