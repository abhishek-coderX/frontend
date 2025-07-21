import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("aisha.khan@example.org");
  const [password, setPassword] = useState("AishaK$trong7");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [err, setErr] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setErr(error?.response?.statusTexts || "Invalid Credentials !!");
    }
  };

  const handleSignup = async (e) => {
    e.target.default();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data))
      navigate('/profile/view')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center  overflow-hidden">
      <div className="p-7 bg-zinc-700 rounded-xl shadow-md w-full max-w-md">
        <h2>{isLoginForm ? "Login" : "Signup"}</h2>
        <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
          {!isLoginForm && (
            <>
              {" "}
              <h3 className="text-lg font-medium mb-2">
                What's your firstname
              </h3>
              <input
                className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="email"
                placeholder="David"
              />{" "}
              <h3 className="text-lg font-medium mb-2">What's your lastname</h3>
              <input
                className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="email"
                placeholder="paul"
              />
            </>
          )}
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-gray-500 border-none outline-none mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
          />
          <button className="bg-[#0a9600] text-white font-semibold mb-3 rounded-lg cursor-pointer px-4 py-2 w-full text-lg">
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>

        <p className="flex text-center justify-center gap-4">
          <Link to="/forgot/password" className="text-red-400">
            forgot password
          </Link>
          {isLoginForm ? (
            <h1>
              New User? <span className="text-blue-400">signup here</span>
            </h1>
          ) : (
            <h1>
              Existing user?{" "}
              <span
                className="text-blue-400"
                onClick={() => setIsLoginForm((value = !value))}
              >
                Login
              </span>
            </h1>
          )}
        </p>
        <p></p>
        {err && (
          <p className="text-center  text-base mt-2 text-red-600">{err}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
