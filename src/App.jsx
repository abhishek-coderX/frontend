// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import { useDispatch, useSelector } from "react-redux";
// import Feed from "./pages/Feed";
// import Profile from "./pages/Profile";
// import Connections from "./pages/Connections";
// import Requests from "./pages/Requests";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { addUser } from "../utils/userSlice";
// import { useEffect } from "react";
// import ProfileView from "./components/ProfileView";
// import EditPassword from "./components/EditPassword";
// import ForgotPassword from "./components/ForgotPassword"

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userData = useSelector((store) => store.user);

//   const fetchUser = async () => {
//     if (userData) return;
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (error) {
//       console.log("Error fetching user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const publicRoutes = ["/login", "/signup","/forgot/password"];

//     if (userData === undefined) return;

//     if (!userData && !publicRoutes.includes(location.pathname)) {
//       navigate("/login");
//     }

//     if (userData && publicRoutes.includes(location.pathname)) {
//       navigate("/");
//     }
//   }, [userData, location.pathname, navigate]);

//   return (
//     <>
//       <div className="relative h-screen w-full">
//         {/* Background image */}
//         <img
//           src="https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/08/luffy-and-zoro.jpg?size=*:900"
//           alt="Background"
//           className="fixed top-0 left-0 w-full h-full object-cover -z-10"
//         />

//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Feed />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/profile/view" element={<ProfileView />} />
//           <Route path="/requests" element={<Requests />} />
//           <Route path="/connections" element={<Connections />} />
//           <Route path="/password/edit" element={<EditPassword />} />
//           <Route
//             path="/forgot/password"
//             element={<ForgotPassword />}
//           />{" "}
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;



import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice"; // <-- 1. Import action
import { useEffect, useState,} from "react"; 
import ProfileView from "./components/ProfileView";
import EditPassword from "./components/EditPassword";
import ForgotPassword from "./components/ForgotPassword";
import ChatPage from "./pages/ChatPage";




function App() {
  const [isLoading, setIsLoading] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store?.user);

  const fetchUser = async () => {
    if (userData ) {
      setIsLoading(false);
      return;
    }
    try {
      const [profileRes, connectionsRes] = await Promise.all([
        axios.get(BASE_URL + "/profile/view", { withCredentials: true }),
        axios.get(BASE_URL + "/user/connections", { withCredentials: true }),
      ]);
      dispatch(addUser(profileRes.data));
      dispatch(addConnections(connectionsRes.data?.data || []));
        } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ["/login", "/signup", "/forgot/password"];

    if (!userData && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }

    if (userData && publicRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [userData, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] w-full bg-base-200">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen w-full ">
        <img
          src="https://wallpapers-clan.com/wp-content/uploads/2024/02/aesthetic-blue-sky-clouds-desktop-wallpaper-preview.jpg"
          alt="Background"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        />

        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/view" element={<ProfileView />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/password/edit" element={<EditPassword />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />{" "}
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;