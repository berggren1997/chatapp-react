export type RegisterType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = {
  success: boolean;
  errorMessages: Array<string>;
};

export type LoginType = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  errorMessage: string;
};

export type MeResponse = {
  username: string;
  userId: string;
};
