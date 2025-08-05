
import ConversationList from "../chat/ConversationList.jsx";
import MessageContainer from "../chat/MessageContainer.jsx";



const ChatPage = () => {
  return (
    <div className="flex items-center justify-center bg-amber-100 min-h-screen  "
    
    >
      <div className="w-full max-w-5xl h-[80vh] md:rounded-2xl shadow-2xl border border-gray-700 bg-gray-900 bg-opacity-90 flex flex-col md:flex-row overflow-hidden transition-all duration-300">
        {/* Fake window bar for code editor feel */}
       
        <div className="w-full md:w-1/3 bg-gray-800 border-r border-gray-700 pt-8">
          <ConversationList />
        </div>
        <div className="w-full md:w-2/3 flex flex-col pt-8">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};
export default ChatPage;



