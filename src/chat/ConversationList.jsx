import { useSelector } from "react-redux";
import Conversation from "./Conversation";

const ConversationList = () => {
  const connections = useSelector((store) => store.connections);

  return (
    <div className="py-2 flex flex-col overflow-auto h-full">
      <div className="px-3 py-2 text-gray-300">Your Crew</div>
      {connections && connections.map((conv) => (
        <Conversation key={conv._id} conversation={conv} />
      ))}
      {(!connections || connections.length === 0) && (
        <p className="text-center text-gray-400 mt-4">No connections yet.</p>
      )}
    </div>
  );
};
export default ConversationList;