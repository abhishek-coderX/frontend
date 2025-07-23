
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../utils/chatSlice";

const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const { selectedConversation, onlineUsers } = useSelector((store) => store.chat);
  
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div
      className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer mx-2 my-1 hover:bg-sky-500 ${
        isSelected ? "bg-sky-500" : ""
      }`}
      onClick={() => dispatch(setSelectedConversation(conversation))}
    >
      <div className={`avatar ${isOnline ? "online" : "offline"}`}>
        <div className="w-12 rounded-full">
          <img src={conversation.photoUrl} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-bold text-gray-200">{conversation.firstName}</p>
      </div>
    </div>
  );
};
export default Conversation;