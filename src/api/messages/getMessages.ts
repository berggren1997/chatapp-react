import { MessageResponse } from "../../types/messages/messageTypes";
import { apiClient } from "../apiClient";

export const getMessagesRequest = async (
  conversationId: string,
  pageNumber: number
) => {
  try {
    const messages = await apiClient.get<MessageResponse[] | any>(
      `/api/message?conversationId=${conversationId}&pageNumber=${pageNumber}&pageSize=${50}`
    );
    if (messages && messages.status === 400) {
      throw new Error("Invalid conversationId from messages.");
    }
    return messages;
  } catch (error) {
    throw error;
  }
};
