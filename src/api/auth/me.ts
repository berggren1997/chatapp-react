// used to fetch information about current user (username, userId)

import { MeResponse } from "../../types/auth/authTypes";
import { apiClient } from "../apiClient";

export const meRequest = async () => {
  try {
    const userData = await apiClient.get<MeResponse>("/api/authentication/me");
    return userData;
  } catch (error) {
    throw error;
  }
};
