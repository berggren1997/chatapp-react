import { LoginResponse, LoginType } from "../../types/auth/authTypes";
import { apiClient } from "../apiClient";

export const loginRequest = async (
  values: LoginType
): Promise<LoginResponse> => {
  try {
    const data = await apiClient.post<LoginType, LoginResponse>(
      "/api/authentication/login",
      values
    );
    return data;
  } catch (err) {
    throw err;
  }
};
