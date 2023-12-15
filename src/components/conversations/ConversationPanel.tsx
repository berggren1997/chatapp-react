import { useContext, useEffect, useState } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import { Outlet, useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import { fetchConversationsRequest } from "../../api/conversations/getConversations";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import ConversationSidebar from "./ConversationSidebar";
import ConversationPanelMembers from "./ConversationPanelMembers";
import ModalOverlay from "../modal/ModalOverlay";
import CreateConversationContent from "../modal/CreateConversationContent";
import useSignalR from "../../hooks/useSignalR";
import { MessageResponse } from "../../types/messages/messageTypes";
import SignalRContext, { SignalRProps } from "../../context/SignalRContext";

const ConversationPanel = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationResponse>();
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );
  const [filteredConversations, setFilteredConversations] = useState<
    ConversationResponse[]
  >([]);

  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

  // const connection = useSignalR("http://localhost:5247/conversationHub");
  // const messageConnection = useSignalR("http://localhost:5247/messageHub");
  const { connections } = useContext(SignalRContext) ?? {};

  const handleSelectedConversation = (conversation: ConversationResponse) => {
    setSelectedConversation(conversation);
  };

  const getSelectedConversation = () => {
    if (id) {
      const selectedConvo = filteredConversations.filter((x) => x.id === id);
      const conversation = selectedConvo[0];
      return conversation;
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

  // TODO: Fixa så att konversationer/användarna sorteras i realtid
  const fetchUserConversations = async () => {
    try {
      const conversationData = await fetchConversationsRequest();
      conversationData.sort(
        (a, b) =>
          new Date(b.lastMessageDetails.sentAt).getTime() -
          new Date(a.lastMessageDetails.sentAt).getTime()
      );
      // console.log("conv data: ", conversationData);

      setConversations(conversationData);
      setFilteredConversations(conversationData);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Lägg till en debounce, så vi inte söker efter varje bokstav
  // OBS: Detta är endast relevant IFALL vi faktiskt går till servern. Sortering på klientsidan
  // fungerar fint att påbörja filtrering direkt
  const filterUserConversations = (username: string) => {
    if (username === "") {
      setFilteredConversations(conversations);
      return;
    }
    console.log("starting filter on letter: " + username);

    const filteredConvos = conversations.filter((u) => {
      if (u.conversationDetails.recipient == currentUser) {
        return u.conversationDetails.creator.includes(username);
      } else {
        return u.conversationDetails.recipient.includes(username);
      }
    });
    setFilteredConversations(filteredConvos);
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

  useEffect(() => {
    if (connections?.messageHub) {
      connections.messageHub.on(
        "OnMessageReceived",
        (msgResponse: MessageResponse) => {
          // console.log("do we get here?");
          fetchUserConversations();
          // console.log(msgResponse);
        }
      );
    }
  }, [connections?.messageHub]);

  useEffect(() => {
    if (connections?.conversationHub) {
      connections.conversationHub.on(
        "NewConversationEvent",
        (conversation: ConversationResponse) => {
          setFilteredConversations((prevConversations) => [
            ...prevConversations,
            conversation,
          ]);
          setConversations((prevConversations) => [
            ...prevConversations,
            conversation,
          ]);
        }
      );
    }
  }, [connections?.conversationHub]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ConversationSidebar
        conversations={filteredConversations}
        setSelectedConversation={handleSelectedConversation}
        currentUser={currentUser}
        openModal={handleOpenModal}
        filterUserConversation={filterUserConversations}
      />
      <div className="flex flex-col flex-1 bg-[#1e1e1e]">
        <ConversationPanelHeader
          conversation={getSelectedConversation()}
          currentUser={currentUser}
        />
        <Outlet />
      </div>
      <ConversationPanelMembers
        conversationDetails={getSelectedConversation()}
        currentUser={currentUser}
      />
      {openModal && (
        <ModalOverlay
          children={
            <CreateConversationContent
              closeModal={handleCloseModal}
              hubConnection={connections?.conversationHub}
            />
          }
        />
      )}
    </>
  );
};

export default ConversationPanel;
