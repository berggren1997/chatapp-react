import { useRef, useState, useEffect, useContext } from "react";
import React from "react";
import ConversationTypeForm from "../forms/ConversationTypeForm";
import { getMessagesRequest } from "../../api/messages/getMessages";
import { MessageResponse } from "../../types/messages/messageTypes";
import { useParams } from "react-router-dom";
import { meRequest } from "../../api/auth/me";
import { RETRIEVE_MESSAGE_EVENT } from "../../constants/signalR";
import { IoIosArrowUp } from "react-icons/io";
import SignalRContext from "../../context/SignalRContext";

const ConversationPanelFeed: React.FC = () => {
  const lastMessageRef = useRef<string>("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState<number>(1);
  const [metaData, setMetaData] = useState<any>({});
  const [isFetchingMoreMessages, setIsFetchingMoreMessages] =
    useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { connections } = useContext(SignalRContext) ?? {};

  const fetchCurrentUser = async () => {
    const user = await meRequest();
    if (user) {
      setUsername(user?.username);
    }
  };

  const fetchMessagesForConversation = async (pageNumber: number) => {
    if (id) {
      try {
        const conversationMessages = await getMessagesRequest(id, pageNumber);

        if (
          conversationMessages.messages &&
          conversationMessages.messages.length > 0
        ) {
          setMessages(conversationMessages.messages);
          setMetaData(conversationMessages.metaData);
        } else {
          setMessages([]);
          setMetaData({});
        }
        // setNextPageNumber(nextPageNumber + 1);
      } catch (error) {
        setMessages([]);
        console.error(error);
      }
    }
  };

  const handleFetchMoreMessages = async () => {
    if (id) {
      setIsFetchingMoreMessages(true);
      const newMessageBatch = await getMessagesRequest(id, nextPageNumber + 1);
      if (newMessageBatch) {
        setMessages((prevMessages) => [
          ...newMessageBatch.messages,
          ...prevMessages,
        ]);
        setNextPageNumber((prevState) => prevState + 1);
        setMetaData(newMessageBatch.metaData);
      }
    }
  };

  useEffect(() => {
    fetchMessagesForConversation(1);
    setNextPageNumber(1);
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
    if (connections?.messageHub) {
      connections.messageHub.off(RETRIEVE_MESSAGE_EVENT);

      connections.messageHub.on(
        RETRIEVE_MESSAGE_EVENT,
        (content: MessageResponse) => {
          console.log("conversationId från url: ", id);
          console.log("conversationId från signalR: ", content.conversationId);

          if (id === content.conversationId) {
            setMessages((prevMessages) => [...prevMessages, content]);
            setIsFetchingMoreMessages(false);
          }
        }
      );
      return () => {
        // Avregistrera prenumerationen vid komponentens demontering eller innan `id` ändras
        connections.messageHub?.off(RETRIEVE_MESSAGE_EVENT);
      };
    }
  }, [connections?.messageHub, id]);

  return (
    <>
      <div
        id="chat-feed"
        className="flex flex-col flex-1 mt-4 p-3 overflow-y-scroll scroll-auto bg-[#1e1e1e]"
        ref={containerRef}
      >
        {/* check hasNextPage from the server, only display the button + span if hasNextPage = true */}
        {metaData.hasNext && (
          <div className="w-full flex flex-col justify-center items-center">
            <button
              onClick={handleFetchMoreMessages}
              className="flex flex-col items-center"
            >
              <IoIosArrowUp className="text-sm text-slate-300" />
              <span className="text-sm text-slate-300">Load more</span>
            </button>
          </div>
        )}
        <div className="flex flex-col mt-3">
          {messages &&
            messages.map((message, idx) => {
              const isPreviousMessage =
                lastMessageRef?.current === message.sender;
              lastMessageRef.current = message.sender;
              return (
                <div
                  key={idx}
                  className="flex flex-col w-[400px] md:w-[500px] text-black"
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
                          {message.sentAt.toString().split("T")[0]}
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
      <ConversationTypeForm
        connection={connections?.messageHub}
        conversationId={id || ""}
      />
    </>
  );
};

export default ConversationPanelFeed;
