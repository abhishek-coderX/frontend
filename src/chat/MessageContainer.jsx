
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Message from "./Message";
// import { setMessages, addMessage } from "../../utils/chatSlice";
// import { useSocket } from "../context/SocketContext";
// import { BASE_URL } from "../../utils/constants";

// const MessageContainer = () => {
//     const { selectedConversation, messages } = useSelector((store) => store.chat);
//     const user = useSelector((store) => store.user);
//     const [loading, setLoading] = useState(false);
//     const [newMessage, setNewMessage] = useState("");
//     const dispatch = useDispatch();
//     const { socket } = useSocket();
//     const lastMessageRef = useRef();

//     useEffect(() => {
//         setTimeout(() => {
// 			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 		}, 100);
//     }, [messages]);

//     useEffect(() => {
//         const getMessages = async () => {
//             if (!selectedConversation) return;
//             setLoading(true);
//             dispatch(setMessages([])); 
//             try {
//                 const res = await fetch(`${BASE_URL}/messages/${selectedConversation._id}`, {
//                     credentials: 'include'
//                 });
//                 const data = await res.json();
//                 if(data.error) throw new Error(data.error);
//                 dispatch(setMessages(data));
//             } catch (error) {
//                 console.error("Error fetching messages:", error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getMessages();
//     }, [selectedConversation, dispatch]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!newMessage.trim() || !user || !socket) return;
        
//         socket.emit("sendMessage", {
//             receiverId: selectedConversation._id,
//             message: newMessage,
//         });

//         const tempMessage = {
//             _id: Date.now(), 
//             sender: user._id,
//             content: newMessage,
//             createdAt: new Date().toISOString(),
//         };
//         dispatch(addMessage(tempMessage));

//         setNewMessage("");
//     };

//     return (
//         <div className="flex flex-col h-full ">
//             {!selectedConversation ? (
//                 <NoChatSelected />
//             ) : (
//                 <>
//                     <div className="bg-slate-700 px-4 py-2 mb-2">
//                         <span className="label-text text-gray-300">To:</span>{" "}
//                         <span className="text-white font-bold">{selectedConversation.firstName}</span>
//                     </div>

//                     <div className="px-4 flex-1 overflow-auto">
//                         {loading && <div className="text-center"><span className="loading loading-spinner"></span></div>}
//                         {!loading && messages.length === 0 && (
//                             <p className="text-center text-gray-400">Send a message to start the conversation.</p>
//                         )}
//                         {!loading && messages.map((msg) => (
//                            <div key={msg._id} ref={lastMessageRef}>
//                              <Message message={msg} />
//                            </div>
//                         ))}
//                     </div>

//                     <form className="px-4 my-3" onSubmit={handleSubmit}>
//                         <div className="w-full relative pb-2">
//                             <input
//                                 type="text"
//                                 className="rounded-full w-full p-3"
//                                 placeholder="Send a message"
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                             />
//                             <button type="submit" className="absolute inset-y-0 end-0 flex items-center p-4 text-xl">
//                                 🕊️
//                             </button>
//                         </div>
//                     </form>
//                 </>
//             )}
//         </div>
//     );
// };
// export default MessageContainer;

// const NoChatSelected = () => {
// 	const user = useSelector((store) => store.user);
// 	return (
// 		<div className='flex items-center justify-center w-full h-full'>
// 			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
// 				<p>Welcome, {user?.firstName}!</p>
// 				<p>Select a crewmate to start chatting.</p>
// 			</div>
// 		</div>
// 	);
// };

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { setMessages, addMessage } from "../../utils/chatSlice";
import { useSocket } from "../context/SocketContext";
import { BASE_URL } from "../../utils/constants";

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
                const res = await fetch(`${BASE_URL}/messages/${selectedConversation._id}`, {
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
        <div className="flex flex-col h-full bg-slate-800  border-slate-600" 
             style={{
                 boxShadow: '4px 4px 8px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.1)',
             }}>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3 mb-2 border-b-4 border-slate-500"
                         style={{
                             boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
                             textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                         }}>
                        <span className="label-text text-gray-300 font-bold">To:</span>{" "}
                        <span className="text-white font-bold text-lg drop-shadow-lg">{selectedConversation.firstName}</span>
                    </div>

                    <div className="px-4 flex-1 overflow-auto"
                         style={{
                             background: 'linear-gradient(145deg, #334155, #1e293b)',
                             boxShadow: 'inset 6px 6px 12px rgba(0,0,0,0.4), inset -6px -6px 12px rgba(255,255,255,0.05)'
                         }}>
                        {loading && (
                            <div className="text-center py-8">
                                <span className="loading loading-spinner text-blue-400" 
                                      style={{
                                          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                                          transform: 'scale(1.2)'
                                      }}></span>
                            </div>
                        )}
                        {!loading && messages.length === 0 && (
                            <p className="text-center text-gray-400 py-8 text-lg font-semibold"
                               style={{
                                   textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                                   transform: 'perspective(500px) rotateX(5deg)'
                               }}>
                                Send a message to start the conversation.
                            </p>
                        )}
                        {!loading && messages.map((msg) => (
                           <div key={msg._id} ref={lastMessageRef}
                                style={{
                                    transform: 'perspective(800px) rotateX(1deg)',
                                    margin: '8px 0'
                                }}>
                             <Message message={msg} />
                           </div>
                        ))}
                    </div>

                    <form className="px-4 my-3" onSubmit={handleSubmit}>
                        <div className="w-full relative pb-2"
                             style={{
                                 transform: 'perspective(600px) rotateX(-2deg)'
                             }}>
                            <input
                                type="text"
                                className="rounded-full w-full p-4 bg-gradient-to-r from-slate-200 to-white border-4 border-slate-400 text-slate-800 font-semibold placeholder-slate-500"
                                placeholder="Send a message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{
                                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.8), 0 6px 12px rgba(0,0,0,0.3)',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                                }}
                            />
                            <button 
                                type="submit" 
                                className="absolute inset-y-0 end-0 flex items-center p-4 text-2xl bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 mt-1 mb-1 border-3 border-blue-400 hover:from-blue-400 hover:to-blue-500 transition-all duration-200"
                                style={{
                                    boxShadow: '4px 4px 8px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2), inset -2px -2px 4px rgba(0,0,0,0.2)',
                                    transform: 'perspective(400px) rotateX(-5deg)',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                                }}
                                onMouseDown={(e) => e.target.style.transform = 'perspective(400px) rotateX(-5deg) scale(0.95)'}
                                onMouseUp={(e) => e.target.style.transform = 'perspective(400px) rotateX(-5deg) scale(1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'perspective(400px) rotateX(-5deg) scale(1)'}
                            >
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
		<div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-700 to-slate-800'
             style={{
                 background: 'radial-gradient(circle at center, #475569, #334155)',
                 boxShadow: 'inset 8px 8px 16px rgba(0,0,0,0.3), inset -8px -8px 16px rgba(255,255,255,0.05)'
             }}>
			<div className='px-8 py-6 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl border-4 border-slate-500'
                 style={{
                     boxShadow: '8px 8px 16px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.1), inset -3px -3px 6px rgba(0,0,0,0.3)',
                     transform: 'perspective(800px) rotateX(5deg) rotateY(-2deg)',
                     textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                 }}>
				<p className="text-2xl font-bold text-blue-300" 
                   style={{
                       filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.3))',
                       transform: 'perspective(400px) rotateX(10deg)'
                   }}>
                    Welcome, {user?.firstName}!
                </p>
				<p className="text-lg"
                   style={{
                       transform: 'perspective(400px) rotateX(-5deg)'
                   }}>
                    Select a crewmate to start chatting.
                </p>
			</div>
		</div>
	);
};