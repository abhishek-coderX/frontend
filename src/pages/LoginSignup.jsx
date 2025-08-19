

// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addUser } from "../../utils/userSlice";
// import { BASE_URL } from "../../utils/constants";

// const LoginSignup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [err, setErr] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [loading,setLoading]=useState(false)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true)
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { email, password },
//         { withCredentials: true }
//       );setLoading(false)
//       dispatch(addUser(res.data));
//       navigate("/");
     
//     }catch (error) {
//     const backendMessage =
//       error.response?.data?.message || error.response?.data || "Invalid credentials!";
//     setErr(backendMessage);
//   } finally {
//     setLoading(false);
//   }
//   };
// const handleSignup = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const res = await axios.post(
//       BASE_URL + "/signup",
//       { firstName, lastName, email, password, skills: ["testing"] },
//       { withCredentials: true }
//     );
//     dispatch(addUser(res?.data?.data));
//     navigate("/profile/view");
//   } catch (error) {
//     if (error.response && error.response.data) {
//       setErr(error.response.data.message || "Invalid credentials!");
//     } else {
//       setErr("Network error. Please try again.");
//     }
//   } finally {
//     setLoading(false); 
//   }
// };


  
//   if (loading) {
//     return (
//       <div className="flex  justify-center items-center min-h-screen">
//         <div className="loading loading-spinner loading-lg"></div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center pr-10  overflow-hidden  bg-cover bg-center bg-no-repeat  "
//       style={{
//    backgroundImage: "url('/signup.avif')"
//   }}
    
//     >
         
//       <div className="p-8 rounded-2xl w-full max-w-md shadow-xl backdrop-blur-md bg-black/60 border border-white/20 text-black">
       
//         <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
//           {!isLoginForm && (
//             <>
//               <h3 className="label-text mb-2 font-semibold dark:text-gray-200">First Name</h3>
//               <input
//                 className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
//                 required
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 type="text"
//                 placeholder="David"
//               />
//               <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Last Name</h3>
//               <input
//                 className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
//                 required
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 type="text"
//                 placeholder="Paul"
//               />
//             </>
//           )}
//           <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Email</h3>
//           <input
//             className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="email@example.com"
//           />
//           <h3 className="label-text mb-2 font-semibold dark:text-gray-200">Password</h3>
//           <input
//             className="border-b-2 border-gray-600 focus:border-blue-400 bg-transparent py-2 px-0 mb-7 w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Enter your Password"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mb-3 rounded-lg cursor-pointer px-4 py-2 w-full text-lg"
//           >
//             {isLoginForm ? "Login" : "Signup"}
//           </button>
//         </form>
//         <p className="flex justify-between mt-4 text-sm text-gray-300">
//           <Link to="/forgot/password" className="text-blue-400 hover:underline">
//             Forgot password?
//           </Link>
//           {isLoginForm ? (
//             <span
//               className="text-blue-400 hover:underline cursor-pointer"
//               onClick={() => setIsLoginForm(false)}
//             >
//               New User? Signup here
//             </span>
//           ) : (
//             <span
//               className="text-blue-400 hover:underline cursor-pointer"
//               onClick={() => setIsLoginForm(true)}
//             >
//               Existing user? Login
//             </span>
//           )}
//         </p>
//         {err && (
//           <p className="text-red-400 text-center mt-4 text-sm">{err}</p>
         
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;



import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [err, setErr] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
            localStorage.setItem('user', JSON.stringify(res.data)); 

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || error.response?.data || "Invalid credentials!";
      setErr(backendMessage);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password, skills: ["testing"] },
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify(res?.data?.data)); 
      dispatch(addUser(res?.data?.data));
      navigate("/profile/view");
    } catch (error) {
      if (error.response && error.response.data) {
        setErr(error.response.data.message || "Invalid credentials!");
      } else {
        setErr("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pr-10  overflow-hidden  bg-cover bg-center bg-no-repeat  "
      style={{
        backgroundImage: "url('/signup.avif')"
      }}
    >
      <div className="p-8 rounded-2xl w-full max-w-md shadow-xl backdrop-blur-md bg-black/60 border border-white/20 text-black">
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
          <p className="text-red-400 text-center mt-4 text-sm">{err}</p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;