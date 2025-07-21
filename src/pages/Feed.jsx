import React, { useEffect } from "react";
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

  if(!feed || feed.length<=0) return <h1 className="flex text-2xl text-center">No new users found</h1>

  return (
    <div className="min-h-screen bg-base-200">
      {feed && feed.length > 0 ? (
        <UserCards user={feed[0]} />
       
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}
    </div>
  );
};

export default Feed;