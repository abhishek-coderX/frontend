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
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900 p-4">
      <div className="card w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-2">Reset Password</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Enter your email and new password to reset your account password
          </p>

          <form onSubmit={handlePasswordReset}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold dark:text-gray-200">Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold dark:text-gray-200">New Password</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold dark:text-gray-200">Confirm New Password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full"
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

          <div className="divider dark:before:bg-gray-600 dark:after:bg-gray-600"></div>

          <div className="text-center">
            <button
              className="btn btn-ghost dark:text-gray-300"
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
