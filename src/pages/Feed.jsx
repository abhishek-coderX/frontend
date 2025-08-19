

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
    
    if (Array.isArray(res.data)) {
      dispatch(addFeed(res.data));
    } else {
      console.error("API response is not an array:", res.data);
      dispatch(addFeed([])); 
    }
  } catch (error) {
    console.log("Error fetching feed:", error);
    dispatch(addFeed([]));
  }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center  items-center min-h-screen bg-cover bg-center bg-no-repeat"
    //  style={{ 
    //   backgroundImage: "url('/sky1.jpg')",
    // }}
    
    >
       
        <div >
          <h1 className="text-2xl text-white">No new users found</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
    // style={{ 
    //   backgroundImage: "url('/sky3.jpg')"}}
   >
       
  
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
