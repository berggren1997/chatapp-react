import {
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";

const useSignalR = (url: string) => {
  const connectionRef = useRef<any>();

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .withHubProtocol(new JsonHubProtocol())
      .configureLogging(LogLevel.Information)
      .build();

    connectionRef.current = hubConnection;

    const startConnection = async () => {
      await hubConnection.start();
    };
    startConnection();

    return () => {
      hubConnection.stop();
    };
  }, [url]);

  return connectionRef.current;
};

export default useSignalR;
