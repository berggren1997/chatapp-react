import { MessageResponse } from "../../types/messages/messageTypes";
import { apiClient } from "../apiClient";

export const getMessagesRequest = async (conversationId: string) => {
  try {
    const messages = await apiClient.get<MessageResponse[]>(
      `/api/message?conversationId=${conversationId}`
    );
    console.log(messages);
    return messages;
  } catch (error) {
    throw error;
  }
};
