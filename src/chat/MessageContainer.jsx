
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { setMessages, addMessage } from "../../utils/chatSlice";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
    const { selectedConversation, messages } = useSelector((store) => store.chat);
    const user = useSelector((store) => store.user);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
    }, [messages]);

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation) return;
            setLoading(true);
            dispatch(setMessages([])); 
            try {
                const res = await fetch(`http://localhost:4000/messages/${selectedConversation._id}`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                dispatch(setMessages(data));
            } catch (error) {
                console.error("Error fetching messages:", error.message);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [selectedConversation, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !socket) return;
        
        socket.emit("sendMessage", {
            receiverId: selectedConversation._id,
            message: newMessage,
        });

        const tempMessage = {
            _id: Date.now(), 
            sender: user._id,
            content: newMessage,
            createdAt: new Date().toISOString(),
        };
        dispatch(addMessage(tempMessage));

        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-full">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-slate-700 px-4 py-2 mb-2">
                        <span className="label-text text-gray-300">To:</span>{" "}
                        <span className="text-white font-bold">{selectedConversation.firstName}</span>
                    </div>

                    <div className="px-4 flex-1 overflow-auto">
                        {loading && <div className="text-center"><span className="loading loading-spinner"></span></div>}
                        {!loading && messages.length === 0 && (
                            <p className="text-center text-gray-400">Send a message to start the conversation.</p>
                        )}
                        {!loading && messages.map((msg) => (
                           <div key={msg._id} ref={lastMessageRef}>
                             <Message message={msg} />
                           </div>
                        ))}
                    </div>

                    <form className="px-4 my-3" onSubmit={handleSubmit}>
                        <div className="w-full relative">
                            <input
                                type="text"
                                className="input input-bordered w-full pe-12"
                                placeholder="Send a message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-xl">
                                🕊️
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
	const user = useSelector((store) => store.user);
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome, {user?.firstName}!</p>
				<p>Select a crewmate to start chatting.</p>
			</div>
		</div>
	);
};
