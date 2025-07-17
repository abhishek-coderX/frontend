import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("sakshi123@gmail.com");
  const [password, setPassword] = useState("Sakshi@2330");
  const [err, setErr] = useState("");
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

  return (
    <div className="h-screen w-full flex items-center justify-center  overflow-hidden">
      <div className="p-7 bg-zinc-700 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            create new account
          </Link>
        </p>
        {err && (
          <p className="text-center  text-base mt-2 text-red-600">
            {err}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
