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
  const [username, setUsername] = useState("");
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );

  const fetchConversationDetails = async () => {
    try {
      console.log("should send request");

      const conversationData = await fetchConversationsRequest();
      setConversations(conversationData);
    } catch (error) {}
  };

  if (conversations) {
    console.log(conversations);
  }

  // const fetchUserData = async () => {
  //   const userData = await meRequest();
  //   return userData;
  // };
  // if (username) {
  //   console.log("hi, " + username);
  // }
  useEffect(() => {
    fetchConversationDetails();
  }, []);
  return (
    <>
      <Sidebar conversations={conversations} />
      <div className="flex flex-col flex-1">
        <ConversationPanelHeader />
        <ConversationPanelFeed />
      </div>
    </>
  );
};

export default ConversationPanel;
