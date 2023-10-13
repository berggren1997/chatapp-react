import { createContext, useState } from "react";

interface User {
  username: string;
  userId: string;
  isAuthenticated: boolean;
}

const UserContext = createContext<User | null>(null);
