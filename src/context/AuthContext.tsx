import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  username: string;
  userId: string;
  setAuthenticated: (newState: boolean) => void;
  setUsername: (newState: string) => void;
  setUserId: (newState: string) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  username: "",
  setUsername: () => {},
  userId: "",
  setUserId: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        username,
        setUsername,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
