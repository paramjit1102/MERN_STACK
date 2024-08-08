import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContent";
import io from "socket.io-client";
const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  // const url = "https://chat-app-5xd6.onrender.com/";
  const url = "http://localhost:8000";
  useEffect(() => {
    if (authUser) {
      const socket = io(url, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers ,io}}>
      {children}
    </SocketContext.Provider>
  );
};
