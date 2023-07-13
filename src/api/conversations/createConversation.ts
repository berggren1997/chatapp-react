import { apiClient } from "../apiClient";

export const createConversationRequest = async (
  recipient: string
): Promise<string> => {
  try {
    const conversationId = await apiClient.post<string, string>(
      "/api/conversation",
      recipient
    );
    return conversationId;
  } catch (error) {
    throw error;
  }
};
