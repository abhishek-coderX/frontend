import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await axios.patch(BASE_URL + "/profile/password/forgot", {
        email,
        newPassword,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error?.response?.data?.replace("Error: ", "") || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900">
        <div className="card w-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl">
          <div className="card-body text-center">
            <div className="text-success text-6xl mb-4">✓</div>
            <h2 className="card-title justify-center text-success">Password Reset!</h2>
            <p>Your password has been reset successfully. Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 dark:bg-gray-900 p-4">
      <div className="card w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl">
        <div className="card-body">
         

          <form onSubmit={handlePasswordReset}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text mb-2 font-semibold dark:text-gray-200">Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text mb-2 font-semibold dark:text-gray-200">New Password</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text mb-2 font-semibold dark:text-gray-200">Confirm New Password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                placeholder="Confirm new password"
                required
              />
            </div>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mb-4">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>


          <div className="text-center">
            <button
              className="btn w-full dark:text-gray-300"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
