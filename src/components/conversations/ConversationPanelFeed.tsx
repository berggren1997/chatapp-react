import { dummyMessageData } from "../../constants/data";
import { useRef, useState, useEffect } from "react";
import React from "react";
import ConversationTypeForm from "../forms/ConversationTypeForm";
import { getMessagesRequest } from "../../api/messages/getMessages";
import { MessageResponse } from "../../types/messages/messageTypes";
import { meRequest } from "../../api/auth/me";

interface Props {
  conversationId: string | undefined;
} // we need to get the current username, and the conversationId from parent

const ConversationPanelFeed: React.FC<Props> = ({ conversationId }) => {
  const lastMessageRef = useRef<string>("");
  const [messages, setMessages] = useState<MessageResponse[]>([]); // konversationens alla meddelande
  const [message, setMessage] = useState(""); // meddelande som ska skickas, ska skickas med till typeform
  const [username, setUsername] = useState("");

  const fetchMessagesForConversation = async (conversationId: string) => {
    if (conversationId) {
      const conversationMessages = await getMessagesRequest(conversationId);
      console.log(conversationMessages);
      if (conversationMessages) {
        setMessages(conversationMessages);
      }
    }
  };

  const fetchCurrentUser = async () => {
    const data = await meRequest();
    if (data) {
      setUsername(data?.username);
    }
  };

  useEffect(() => {
    console.log("conversationid to fetch: " + conversationId);
    if (conversationId) {
      fetchMessagesForConversation(conversationId);
    }
    fetchCurrentUser();
  }, [conversationId]);

  if (messages.length === 0) return <div>ConversationPanel</div>;

  return (
    <>
      <div className="flex flex-1 mt-4 p-3 overflow-y-scroll scroll-auto bg-[#1e1e1e]">
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
      <ConversationTypeForm />
    </>
  );
};

export default ConversationPanelFeed;
