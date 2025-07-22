
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const ProfileView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data || "Failed to load profile");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-base-200 justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-red-500 text-center">
          <p>{error.message || error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-100 dark:bg-gray-900 p-4 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="avatar">
                  <div className="w-48 h-48 rounded-full">
                    <img
                      src={user?.photoUrl || "https://via.placeholder.com/200"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <div className="flex gap-4 text-gray-600 dark:text-gray-300 mb-4">
                    <span>Age: {user?.age}</span>
                    <span>Gender: {user?.gender}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {user?.about || "No description available"}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.skills?.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="badge badge-primary dark:badge-outline"
                        >
                          {skill}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        No skills listed
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => navigate("/password/edit")}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
