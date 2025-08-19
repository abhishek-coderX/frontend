
import { createContext, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers, addMessage } from "../../utils/chatSlice";
import { BASE_URL } from "../../utils/constants";

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
      const newSocket = io(BASE_URL, {
        withCredentials: true, 
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      newSocket.on("receiveMessage", (newMessage) => {
        dispatch(addMessage(newMessage));
      });

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
