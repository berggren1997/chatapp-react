import { useEffect, useState } from "react";
import ConversationPanelHeader from "./ConversationPanelHeader";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import { fetchConversationsRequest } from "../../api/conversations/getConversations";
import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import ConversationSidebar from "./ConversationSidebar";
import ConversationPanelMembers from "./ConversationPanelMembers";
import ModalOverlay from "../modal/ModalOverlay";
import CreateConversationContent from "../modal/CreateConversationContent";
import useSignalR from "../../hooks/useSignalR";
import IncomingCall from "../calls/IncomingCall";
import { toast } from "react-toastify";
import OutgoingCall from "../calls/OutgoingCall";

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
  const [openCallModal, setOpenCallModal] = useState(false);
  const [openOutgoingCallModal, setOpenOutgoingCallModal] = useState(false);

  const connection = useSignalR("http://localhost:5247/conversationHub");
  const callsConnection = useSignalR("http://localhost:5247/callsHub");

  const navigate = useNavigate();

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

  const handleCloseCallsModal = () => {
    setOpenCallModal(false);
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
          setOpenCallModal(true);
        }
      );

      callsConnection.on("AcceptCall", (response: any) => {
        console.log(response);
        setIncomingCall(false);
        navigate("/call");
      });

      callsConnection.on("DeclineCall", (response: any) => {
        console.log(response);
        setIncomingCall(false);
        toast.info(response, {
          theme: "dark",
        });
      });
    }
  }, [callsConnection]);

  const handleOpenOutgoingCallModal = () => {
    setOpenOutgoingCallModal(true);
  };

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
          conversation={getSelectedConversation()}
          currentUser={currentUser}
          callsConnection={callsConnection}
          openOutgoingCallModal={handleOpenOutgoingCallModal}
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
      {openCallModal && (
        <ModalOverlay
          children={
            <IncomingCall
              callingUsername={callingUserName}
              callingUserId={callingUserId}
              callsConnection={callsConnection}
              closeCallModal={handleCloseCallsModal}
            />
          }
        />
      )}

      {openOutgoingCallModal && <ModalOverlay children={<OutgoingCall />} />}
    </>
  );
};

export default ConversationPanel;
