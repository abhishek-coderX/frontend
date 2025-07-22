import React from "react";
import { Heart, X, MapPin, Briefcase, Calendar, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../../utils/feedSlice";
import axios from "axios";

export default function UserCards({ user }) {
  const {_id}=user
  const dispatch=useDispatch()
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.log(error);
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="relative ">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden  w-80 mx-auto transform hover:scale-105 transition-transform duration-300">
          <div className="relative">
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-60 object-cover"
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
              <button className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                <X className="w-5 h-5 text-gray-600 mr-2 cursor-pointer" strokeWidth={2} />
                <span className="text-gray-700 font-medium" onClick={()=>handleRequest("ignored",_id)}>Ignore</span>
              </button>

              <button className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-full transition-all duration-200">
                <Heart className="w-5 h-5 text-white mr-2 " strokeWidth={2} />
                <span className="text-white font-medium" onClick={()=>handleRequest("interested",_id)}>Interested</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
