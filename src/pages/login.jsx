// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addUser } from "../../utils/userSlice";
// import { BASE_URL } from "../../utils/constants";

// const Login = () => {
//   const [email, setEmail] = useState("aisha.khan@example.org");
//   const [password, setPassword] = useState("AishaK$trong7");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [err, setErr] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (error) {
//       setErr(error?.response?.statusTexts || "Invalid Credentials !!");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.target.default();
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { firstName, lastName, email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res?.data?.data))
//       navigate('/profile/view')
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center  overflow-hidden">
//       <div className="p-7 bg-zinc-700 rounded-xl shadow-md w-full max-w-md">
//         <h2>{isLoginForm ? "Login" : "Signup"}</h2>
//         <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
//           {!isLoginForm && (
//             <>
//               {" "}
//               <h3 className="text-lg font-medium mb-2">
//                 What's your firstname
//               </h3>
//               <input
//                 className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
//                 required
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 type="text"
//                 placeholder="David"
//               />{" "}
//               <h3 className="text-lg font-medium mb-2">What's your lastname</h3>
//               <input
//                 className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
//                 required
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 type="text"
//                 placeholder="paul"
//               />
//             </>
//           )}
//           <h3 className="text-lg font-medium mb-2">What's your email</h3>
//           <input
//             className="bg-gray-500 mb-7 rounded-lg px-4 py-2 border-none outline-none w-full text-lg placeholder:text-base"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="email@example.com"
//           />

//           <h3 className="text-lg font-medium mb-2">Enter Password</h3>
//           <input
//             className="bg-gray-500 border-none outline-none mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Enter your Password"
//           />
//           <button className="bg-[#0a9600] text-white font-semibold mb-3 rounded-lg cursor-pointer px-4 py-2 w-full text-lg">
//             {isLoginForm ? "Login" : "Signup"}
//           </button>
//         </form>

//         <p className="flex text-center justify-center gap-4">
//           <Link to="/forgot/password" className="text-red-400">
//             forgot password
//           </Link>
//           {isLoginForm ? (
//             <h1>
//               New User? <span className="text-blue-400">signup here</span>
//             </h1>
//           ) : (
//             <h1>
//               Existing user?{" "}
//               <span
//                 className="text-blue-400"
//                 onClick={() => setIsLoginForm((value = !value))}
//               >
//                 Login
//               </span>
//             </h1>
//           )}
//         </p>
//         <p></p>
//         {err && (
//           <p className="text-center  text-base mt-2 text-red-600">{err}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;



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
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );setLoading(false)
      dispatch(addUser(res.data));
      navigate("/");
     
    } catch (error) {
      setErr(error?.response?.data || "Invalid Credentials!");
      setLoading(false)
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password , skills: ["testing"],},
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile/view");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup Failed!");
      setLoading(false)
    }
  };


  
  if (loading) {
    return (
      <div className="flex bg-base-200 justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-xl shadow-lg shadow-gray-700/50 w-full max-w-md">
       
        <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
          {!isLoginForm && (
            <>
              <h3 className="label-text mb-2 font-semibold dark:text-gray-200">First Name</h3>
              <input
                className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="David"
              />
              <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Last Name</h3>
              <input
                className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Paul"
              />
            </>
          )}
          <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Email</h3>
          <input
            className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Password</h3>
          <input
            className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mb-3 rounded-lg cursor-pointer px-4 py-2 w-full text-lg"
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>
        <p className="flex justify-between mt-4 text-sm text-gray-300">
          <Link to="/forgot/password" className="text-blue-400 hover:underline">
            Forgot password?
          </Link>
          {isLoginForm ? (
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => setIsLoginForm(false)}
            >
              New User? Signup here
            </span>
          ) : (
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => setIsLoginForm(true)}
            >
              Existing user? Login
            </span>
          )}
        </p>
        {err && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded relative mt-4">
            <p className="text-center">{err}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;