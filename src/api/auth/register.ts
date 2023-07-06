import { RegisterResponse, RegisterType } from "../../types/auth/authTypes";
import { apiClient } from "../apiClient";

export const registerRequest = async (values: RegisterType) => {
  try {
    const data = await apiClient.post<RegisterType, RegisterResponse>(
      "/api/authentication/register",
      values
    );
    return data;
  } catch (error) {
    throw error;
  }
};
