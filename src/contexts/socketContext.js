import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { backendUrl } from "../config";

export const SocketContext = createContext({
  socket: null,
  createSocket: () => {},
  setSocket: () => {},
});

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const createSocket = (session_code, home_context) => {
    const URL = backendUrl;
    const socket = io(URL, {
      autoConnect: true,
      auth: {
        session_code: session_code,
        home_context: home_context,
      },
    });
    return socket;
  };

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <div>
      <SocketContext.Provider value={{ socket, setSocket, createSocket }}>
        {children}
      </SocketContext.Provider>
    </div>
  );
};
