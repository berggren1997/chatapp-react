import { useEffect, useState } from "react";
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
  const [incomingCall, setIncomingCall] = useState(false);
  const [callingUserId, setCallingUserId] = useState("");
  const [callingUserName, setCallingUserName] = useState("");

  const connection = useSignalR("http://localhost:5247/conversationHub");
  const callsConnection = useSignalR("http://localhost:5247/callsHub");

  const handleSelectedConversation = (conversation: ConversationResponse) => {
    setSelectedConversation(conversation);
  };

  const getSelectedConversation = () => {
    if (id) {
      const selectedConvo = conversations.filter((x) => x.id === id);
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

  useEffect(() => {
    if (connection) {
      connection.on(
        "NewConversationEvent",
        (conversation: ConversationResponse) => {
          setConversations((prevConversations) => [
            ...prevConversations,
            conversation,
          ]);
        }
      );

      // connection.invoke("NewConversationNotification");
    }
  }, [connection]);

  useEffect(() => {
    if (callsConnection) {
      callsConnection.on(
        "IncomingCall",
        (callerId: string, callerName: string) => {
          console.log(callerId, callerName);
          setCallingUserId(callerId);
          setCallingUserName(callerName);
          setIncomingCall(true);
        }
      );

      callsConnection.on("AcceptCall", (response: any) => {
        console.log(response);
        setIncomingCall(false);
      });

      callsConnection.on("DeclineCall", (response: any) => {
        console.log(response);
        setIncomingCall(false);
      });
    }
  }, [callsConnection]);

  const handleAnswerCall = () => {
    if (callsConnection) {
      callsConnection.invoke("AnswerCall", callingUserId);
      setIncomingCall(false);
    }
  };

  const handleDeclineCall = () => {
    if (callsConnection) {
      callsConnection.invoke("DeclineCall", callingUserId);
      setIncomingCall(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {incomingCall && (
        <div className="fixed border-2 border-red-500 w-full ml-[300px] flex items-center justify-center gap-5">
          <p>{callingUserName} is calling you:</p>
          <button onClick={handleAnswerCall}>ACCEPT</button>
          <button onClick={handleDeclineCall}>DECLINE</button>
        </div>
      )}
      <ConversationSidebar
        conversations={conversations}
        setSelectedConversation={handleSelectedConversation}
        currentUser={currentUser}
        openModal={handleOpenModal}
      />
      <div className="flex flex-col flex-1 bg-[#1e1e1e]">
        <ConversationPanelHeader
          conversation={getSelectedConversation()}
          currentUser={currentUser}
          callsConnection={callsConnection}
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
              hubConnection={connection}
            />
          }
        />
      )}
    </>
  );
};

export default ConversationPanel;
