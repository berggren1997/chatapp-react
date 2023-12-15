import { createContext } from "react";

interface ConnectionProps {
  messageHub: any;
  conversationHub: any;
}
export interface SignalRProps {
  connections?: ConnectionProps;
}

const SignalRContext = createContext<SignalRProps | undefined>(undefined);

export default SignalRContext;
