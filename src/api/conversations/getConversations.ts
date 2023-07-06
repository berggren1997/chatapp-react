import { ConversationResponse } from "../../types/conversations/conversationsTypes";
import { apiClient } from "../apiClient";

export const fetchConversationsRequest = async () => {
  try {
    const data = await apiClient.get<ConversationResponse[]>(
      "/api/conversation"
    );
    return data;
  } catch (error) {
    throw error;
  }
};
