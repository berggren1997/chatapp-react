import { MessageResponse } from "../../types/messages/messageTypes";
import { apiClient } from "../apiClient";

export const getMessagesRequest = async (
  conversationId: string,
  pageNumber: number
) => {
  try {
    const response = await apiClient.get<MessageResponse[] | any>(
      `/api/message?conversationId=${conversationId}&pageNumber=${pageNumber}&pageSize=${50}`
    );
    if (response && response.status === 404) {
      throw new Error("ConnversationId has no messages.");
    }
    const { messages, metaData } = response;
    return { messages, metaData };
  } catch (error) {
    throw error;
  }
};
