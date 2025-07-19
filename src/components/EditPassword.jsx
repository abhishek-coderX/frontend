import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const EditPassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.patch(
        `${BASE_URL}/profile/password/edit`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error?.response?.data?.replace("Error: ", "") || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-96 bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <div className="text-green-400 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">Success!</h2>
          <p className="text-gray-300">Password updated successfully. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 text-gray-100">
        <h2 className="text-2xl font-bold text-center">Change Password</h2>
      

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Current Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">New Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Confirm New Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-600 text-white text-sm px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>


        <div className="flex gap-2">
          <button
            className="btn btn-outline border-gray-500 text-gray-200 flex-1"
            onClick={() => navigate("/profile/view")}
          >
            Back to Profile
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
