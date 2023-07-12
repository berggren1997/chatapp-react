import { FindUserResponse } from "../../types/users/userTypes";
import { apiClient } from "../apiClient";

export const findUserRequest = async (username: string) => {
  try {
    const response = await apiClient.get<FindUserResponse[]>(
      `/api/user/multiple/${username}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
