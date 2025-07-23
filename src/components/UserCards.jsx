// import { Heart, X, MapPin, Briefcase, Calendar, Users } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../../utils/constants";
// import { removeUserFromFeed } from "../../utils/feedSlice";
// import axios from "axios";

// export default function UserCards({ user }) {
//   const {_id}=user
//   const dispatch=useDispatch()
//   const handleRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(userId))
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-gray-500">Loading user profile...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
//       <div className="relative ">
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden  w-80 mx-auto transform hover:scale-105 transition-transform duration-300">
//           <div className="relative">
//             <img
//               src={user.photoUrl}
//               alt={`${user.firstName} ${user.lastName}`}
//               className="w-full h-60 object-cover"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/0 to-transparent p-4">
//               <h1 className="text-white text-2xl font-bold mb-1">
//                 {user.firstName} {user.lastName}
//               </h1>
//               <div className="flex items-center text-white/90 text-sm gap-2 ">
//                 <span>{user.age}</span>
//                 <span>{user.gender} </span>
//               </div>
//               <div className="flex items-center text-white/90 text-sm "></div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="mb-2">
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {user.about}
//               </p>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wide">
//                 Skills
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {user.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center items-center space-x-8 mt-4">
//               <button className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
//                 <X className="w-5 h-5 text-gray-600 mr-2 cursor-pointer" strokeWidth={2} />
//                 <span className="text-gray-700 font-medium" onClick={()=>handleRequest("ignored",_id)}>Ignore</span>
//               </button>

//               <button className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-full transition-all duration-200">
//                 <Heart className="w-5 h-5 text-white mr-2 " strokeWidth={2} />
//                 <span className="text-white font-medium" onClick={()=>handleRequest("interested",_id)}>Interested</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { Heart, X } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../../utils/constants";
// import axios from "axios";
// import { motion, useMotionValue, useTransform } from "framer-motion";

// export default function UserCards({ user, isTopCard, removeUser }) {
//   const dispatch = useDispatch();
  
//   const x = useMotionValue(0);

//   const rotate = useTransform(x, [-250, 250], [-25, 25]);
//   const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);

//   const handleRequest = async (status, userId) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );
//       // We no longer dispatch here; the parent component handles removal
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✨ FRAMER MOTION: Handle the end of a drag gesture
//   const handleDragEnd = (event, info) => {
//     // If dragged more than 100px, consider it a swipe
//     if (Math.abs(info.offset.x) > 100) {
//       const swipeDirection = info.offset.x > 0 ? "interested" : "ignored";
//       handleRequest(swipeDirection, user._id);
//       removeUser(); // Trigger the removal from the parent's state
//     }
//   };

//   // The content of your card remains largely the same, but it's now inside a motion.div
//   return (
//     <motion.div
//       // ✨ FRAMER MOTION: Connect style properties to motion values
//       style={{
//         x,
//         rotate,
//         gridRow: 1,      // Style to stack cards on top of each other
//         gridColumn: 1,   // Style to stack cards on top of each other
//       }}
//       // ✨ FRAMER MOTION: Animate opacity and scale
//       animate={{
//         opacity: isTopCard ? 1 : 0.75,
//         scale: isTopCard ? 1 : 0.95,
//       }}
//       // ✨ FRAMER MOTION: Add exit animation
//       exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
//       // ✨ FRAMER MOTION: Enable dragging only on the top card
//       drag={isTopCard ? "x" : false}
//       dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//       onDragEnd={handleDragEnd}
//       className="absolute h-[550px] w-80 transform cursor-grab rounded-3xl bg-white shadow-2xl active:cursor-grabbing"
//     >
//       {/* Your original card content goes here */}
//       <div className="h-full w-full overflow-hidden rounded-3xl">
//         <div className="relative h-full">
//           <img
//             src={user.photoUrl}
//             alt={`${user.firstName} ${user.lastName}`}
//             className="pointer-events-none h-1/2 w-full object-cover" // prevent image drag
//           />
//           <div className="absolute bottom-1/2 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
//             <h1 className="text-2xl font-bold text-white">
//               {user.firstName} {user.lastName} 
//             </h1>
//             <p className="text-sm text-white/90">{user.gender}</p>
//             <p className="text-sm text-white/90"> {user.age}</p>
           
//           </div>

//           <div className="flex h-1/2 flex-col justify-between p-6">
//             <div>
//               <p className="leading-relaxed text-gray-600">{user.about}</p>
//               <h3 className="mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-gray-800">
//                 Skills
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {user.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-center space-x-8">
//               <button
//                 onClick={() => {
//                   handleRequest("ignored", user._id);
//                   removeUser();
//                 }}
//                 className="flex transform items-center justify-center rounded-full bg-gray-100 px-6 py-3 transition-colors duration-200 hover:bg-gray-200 active:scale-95"
//               >
//                 <X className="mr-2 h-5 w-5 text-gray-600" strokeWidth={2} />
//                 <span className="font-medium text-gray-700">Ignore</span>
//               </button>
//               <button
//                 onClick={() => {
//                   handleRequest("interested", user._id);
//                   removeUser();
//                 }}
//                 className="flex transform items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-white transition-all duration-200 hover:from-pink-600 hover:to-red-600 active:scale-95"
//               >
//                 <Heart className="mr-2 h-5 w-5" strokeWidth={2} />
//                 <span className="font-medium">Interested</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import React from "react";
import { Heart, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function UserCards({ user, isTopCard, removeUser }) {
  const dispatch = useDispatch();
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const swipeDirection = info.offset.x > 0 ? "interested" : "ignored";
      handleRequest(swipeDirection, user._id);
      removeUser();
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-gray-500">Loading user profile...</div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        x,
        rotate,
        gridRow: 1,
        gridColumn: 1,
      }}
      animate={{
        opacity: isTopCard ? 1 : 0.75,
        scale: isTopCard ? 1 : 0.95,
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute transform cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white rounded-3xl  overflow-hidden w-80 mx-auto transform hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <img
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-60 object-cover pointer-events-none"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/0 to-transparent p-4">
            <h1 className="text-white text-2xl font-bold mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center text-white/90 text-sm gap-2 ">
              <span>{user.age}</span>
              <span>{user.gender} </span>
            </div>
            <div className="flex items-center text-white/90 text-sm "></div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2">
            <p className="text-gray-600 text-sm leading-relaxed">
              {user.about}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wide">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 mt-4">
            <button 
              className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              onClick={() => {
                handleRequest("ignored", user._id);
                removeUser();
              }}
            >
              <X className="w-5 h-5 text-gray-600 mr-2 cursor-pointer" strokeWidth={2} />
              <span className="text-gray-700 font-medium">Ignore</span>
            </button>

            <button 
              className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-full transition-all duration-200"
              onClick={() => {
                handleRequest("interested", user._id);
                removeUser();
              }}
            >
              <Heart className="w-5 h-5 text-white mr-2 " strokeWidth={2} />
              <span className="text-white font-medium">Interested</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}