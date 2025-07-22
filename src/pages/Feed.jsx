import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";
import UserCards from "../components/UserCards";
import { Heading1 } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  
  const getFeed = async () => {

    if (feed) return;
     
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

  


  if(!feed || feed.length<=0) return <div className="flex justify-center bg-base-200 items-center min-h-[calc(100vh-4rem)]">
      <div><h1 className="text-2xl text-white ">
        No new users found
      
      </h1>
     
       
</div>
    </div>

  return (
    <div className="h-screen w-full ">
      {feed && feed.length > 0 ? (
        <UserCards user={feed[0]} />
       
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-200">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}
    </div>
  );
};

export default Feed;


