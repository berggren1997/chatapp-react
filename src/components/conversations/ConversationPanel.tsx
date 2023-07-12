import { useEffect, useState } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import { Outlet, useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import { fetchConversationsRequest } from "../../api/conversations/getConversations";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import ConversationSidebar from "./ConversationSidebar";
import ConversationPanelMembers from "./ConversationPanelMembers";
import ModalOverlay from "../ModalOverlay";
import CreateConversationContent from "./CreateConversationContent";

const ConversationPanel = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationResponse>();
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    fetchUserConversations();
    fetchCurrentUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ConversationSidebar
        conversations={conversations}
        setSelectedConversation={handleSelectedConversation}
        currentUser={currentUser}
        openModal={handleOpenModal}
      />
      <div className="flex flex-col flex-1 bg-[#1e1e1e]">
        <ConversationPanelHeader
          conversation={getSelectedConversation(id || "")}
          currentUser={currentUser}
        />
        <Outlet />
      </div>
      <ConversationPanelMembers
        conversationDetails={getSelectedConversation(id || "")}
      />
      {openModal && (
        <ModalOverlay
          children={<CreateConversationContent closeModal={handleCloseModal} />}
        />
      )}
    </>
  );
};

export default ConversationPanel;
