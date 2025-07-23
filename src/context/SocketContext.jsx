
import { createContext, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers, addMessage } from "../../utils/chatSlice";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:4000", {
        withCredentials: true, // Sends cookies for authentication
      });

      setSocket(newSocket);

      // Listens for the list of online users from the backend
      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      // Listens for incoming messages
      newSocket.on("receiveMessage", (newMessage) => {
        // Here you could add a sound effect!
        dispatch(addMessage(newMessage));
      });

      // Cleanup function to close the socket when the user logs out
      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
