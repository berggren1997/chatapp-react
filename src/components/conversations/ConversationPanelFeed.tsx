import { useRef, useState, useEffect } from "react";
import React from "react";
import ConversationTypeForm from "../forms/ConversationTypeForm";
import { getMessagesRequest } from "../../api/messages/getMessages";
import { MessageResponse } from "../../types/messages/messageTypes";
import { useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import useSignalR from "../../hooks/useSignalR";
import { RETRIEVE_MESSAGE_EVENT } from "../../constants/signalR";

const ConversationPanelFeed: React.FC = () => {
  const lastMessageRef = useRef<string>("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState<number>(1);
  const [isFetchingMoreMessages, setIsFetchingMoreMessages] =
    useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubConnection = useSignalR("http://localhost:5247/messageHub");

  const fetchCurrentUser = async () => {
    const user = await meRequest();
    if (user) {
      setUsername(user?.username);
    }
  };

  const fetchMessagesForConversation = async () => {
    if (id) {
      try {
        const conversationMessages = await getMessagesRequest(
          id,
          nextPageNumber
        );
        setMessages(conversationMessages);
        setNextPageNumber(nextPageNumber + 1);
      } catch (error) {
        setMessages([]);
        console.error(error);
      }
    }
  };

  const handleFetchMoreMessages = async () => {
    if (id) {
      setIsFetchingMoreMessages(true);
      const newMessageBatch = await getMessagesRequest(id, nextPageNumber);
      if (newMessageBatch) {
        setMessages((prevMessages) => [...newMessageBatch, ...prevMessages]);
      }
    }
  };

  useEffect(() => {
    fetchMessagesForConversation();
  }, [id]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const chatFeedElement = document.getElementById("chat-feed");
    if (chatFeedElement && !isFetchingMoreMessages) {
      chatFeedElement.scrollTop = chatFeedElement.scrollHeight;
    }
  }, [messages, isFetchingMoreMessages]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on(RETRIEVE_MESSAGE_EVENT, (content: MessageResponse) => {
        setMessages((prevMessages) => [...prevMessages, content]);
        setIsFetchingMoreMessages(false);
      });
    }
  }, [hubConnection]);

  if (messages && messages.length === 0) return <div>ConversationPanel</div>;

  if (messages.length > 0)
    return (
      <>
        <div
          id="chat-feed"
          className="flex flex-col flex-1 mt-4 p-3 overflow-y-scroll scroll-auto bg-[#1e1e1e]"
          ref={containerRef}
        >
          <button onClick={handleFetchMoreMessages}>
            <span className="text-[16px] text-slate-300">load more</span>
          </button>
          <div className="flex flex-col mt-3">
            {messages.map((message, idx) => {
              const isPreviousMessage =
                lastMessageRef?.current === message.sender;
              lastMessageRef.current = message.sender;
              return (
                <div
                  key={idx}
                  className="flex flex-col w-[400px] md:w-[500px] text-black mb-2"
                >
                  <div className="flex flex-row items-center gap-3">
                    {(!isPreviousMessage || idx === 0) && (
                      <React.Fragment>
                        <div
                          className={`${
                            message.sender === username
                              ? "bg-blue-500"
                              : "bg-red-500"
                          } h-[32px] w-[32px] rounded-full`}
                        ></div>
                        <p className="text-[16px]">{message.sender}</p>
                        <span className="text-xs text-slate-400">
                          {/* Yesterday - 17:15 */}
                          {message.sentAt.split("T")[0]}
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                  <div className="flex flex-col ml-11 mb-2">
                    <span className="text-[13px] text-slate-300">
                      {message.message}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div ref={scrollRef}></div> */}
        {/* <button onClick={sendMessageAsync}>Test WS</button> */}
        <ConversationTypeForm
          connection={hubConnection}
          conversationId={id || ""}
        />
      </>
    );
};

export default ConversationPanelFeed;
