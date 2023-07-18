import { apiClient } from "../apiClient";

export const createConversationRequest = async (recipient: string) => {
  try {
    const response = await apiClient.post<string, string | any>(
      "/api/conversation",
      recipient
    );
    if (response && response?.StatusCode === 400) {
      console.log("do we get here?", response);

      throw new Error(response.ErrorMessage);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
