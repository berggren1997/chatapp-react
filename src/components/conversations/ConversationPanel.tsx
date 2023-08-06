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
import IncomingCall from "../calls/IncomingCall";
import { toast } from "react-toastify";
import OutgoingCall from "../calls/OutgoingCall";
import CallPanel from "../calls/CallPanel";

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
  const [outgoingCallUsername, setOutgoingCallUsername] = useState("");
  const [openIncomingCallModal, setOpenIncomingCallModal] = useState(false);
  const [openOutgoingCallModal, setOpenOutgoingCallModal] = useState(false);
  const [acceptedCall, setAcceptedCall] = useState(false);
  const [toggleVoiceChatRecipient, setToggleVoiceChatRecipient] =
    useState(false);

  const connection = useSignalR("http://localhost:5247/conversationHub");
  const callsConnection = useSignalR("http://localhost:5247/callsHub");

  const handleSelectedConversation = (conversation: ConversationResponse) => {
    setSelectedConversation(conversation);
  };

  const handleToggleVoiceChatRecipient = () => {
    setToggleVoiceChatRecipient(true);
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
      const sortedConversations = conversationData.sort(
        (a, b) =>
          new Date(b.lastMessageDetails.sentAt).getTime() -
          new Date(a.lastMessageDetails.sentAt).getTime()
      );
      console.log("Not sorted?", conversationData);
      console.log("Sorted?", sortedConversations);

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
    setOpenIncomingCallModal(false);
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
          setCallingUserId(callerId);
          setCallingUserName(callerName);
          setOpenIncomingCallModal(true);
        }
      );

      callsConnection.on("AcceptCall", (response: any) => {
        setIncomingCall(false);
        setAcceptedCall(true);
        setOpenOutgoingCallModal(false);
      });

      callsConnection.on("DeclineCall", (response: any) => {
        setIncomingCall(false);
        setOpenOutgoingCallModal(false);
        toast.info(response, {
          theme: "dark",
        });
      });
    }
  }, [callsConnection]);

  const handleOpenOutgoingCallModal = () => {
    setOpenOutgoingCallModal(true);
  };

  const setCalledUsername = (username: string) => {
    setOutgoingCallUsername(username);
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
          setCalledUsername={setCalledUsername}
        />
        {acceptedCall && <CallPanel user={currentUser} />}
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
      {openIncomingCallModal && (
        <ModalOverlay
          children={
            <IncomingCall
              callingUsername={callingUserName}
              callingUserId={callingUserId}
              callsConnection={callsConnection}
              closeCallModal={handleCloseCallsModal}
              toggleVoiceChatAreaForRecipient={handleToggleVoiceChatRecipient}
            />
          }
        />
      )}

      {openOutgoingCallModal && (
        <ModalOverlay
          children={<OutgoingCall callingUsername={outgoingCallUsername} />}
        />
      )}
    </>
  );
};

export default ConversationPanel;
