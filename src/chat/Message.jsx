
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const user = useSelector((store) => store.user);
  const { selectedConversation } = useSelector((store) => store.chat);
  
  const fromMe = message.sender === user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.photoUrl : selectedConversation?.photoUrl;
  const bubbleColor = fromMe ? "chat-bubble-primary" : "";
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor}`}>
        {message.content}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center mt-1">
        {time}
      </div>
    </div>
  );
};
export default Message;
