// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";
// import { addFeed } from "../../utils/feedSlice";
// import UserCards from "../components/UserCards";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();
  
  
//   const getFeed = async () => {

//     if (feed) return;
     
//     try {
//       const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
//       dispatch(addFeed(res.data));
     
//     } catch (error) {
//       console.log("Error fetching feed:", error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

  


//   if(!feed || feed.length<=0) return <div className="flex justify-center bg-base-200 items-center min-h-[calc(100vh-4rem)]">
//       <div><h1 className="text-2xl text-white ">
//         No new users found
      
//       </h1>
     
       
// </div>
//     </div>

//   return (
//     <div className="min-h-[calc(100vh-4rem)] w-full ">
//       {feed && feed.length > 0 ? (
//         <UserCards user={feed[0]} />
       
//       ) : (
//         <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-200">
//           <div className="loading loading-spinner loading-lg"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";
// import { addFeed, removeUserFromFeed } from "../../utils/feedSlice"; 
// import UserCards from "../components/UserCards"; // Renamed for clarity
// import { AnimatePresence } from "framer-motion"; // ✨ Import AnimatePresence

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     // We only fetch if the feed is not already populated.
//     if (feed && feed.length > 0) return;
     
//     try {
//       const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
//       dispatch(addFeed(res.data));
//     } catch (error) {
//       console.log("Error fetching feed:", error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []); // Dependency array is empty, so it runs once on mount

//   if (!feed) {
//     return (
//       <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-200">
//         <div className="loading loading-spinner loading-lg"></div>
//       </div>
//     );
//   }

//   if (feed.length === 0) {
//     return (
//       <div className="flex justify-center bg-base-200 items-center min-h-[calc(100vh-4rem)]">
//         <div>
//           <h1 className="text-2xl text-white">No new users found</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // ✨ This div becomes the stacking container
//     <div className="grid h-[calc(100vh-4rem)] w-full place-items-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
//       <AnimatePresence>
//         {feed.map((user, index) => {
//           return (
//             <UserCards
//               key={user._id}
//               user={user}
//               isTopCard={index === feed.length - 1} // ✨ Pass a prop to identify the top card
//               removeUser={() => dispatch(removeUserFromFeed(user._id))} // ✨ Pass a function to remove the user
//             />
//           );
//         })}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Feed;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed, removeUserFromFeed } from "../../utils/feedSlice"; 
import UserCards from "../components/UserCards";
import { AnimatePresence } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
     
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center bg-base-200 items-center min-h-[calc(100vh-4rem)]">
        <div>
          <h1 className="text-2xl text-white">No new users found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="relative">
        <div className="grid place-items-center">
          <AnimatePresence>
            {feed.map((user, index) => {
              return (
                <UserCards
                  key={user._id}
                  user={user}
                  isTopCard={index === feed.length - 1}
                  removeUser={() => dispatch(removeUserFromFeed(user._id))}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Feed;
