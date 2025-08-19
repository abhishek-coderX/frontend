


// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Login from "./pages/LoginSignup";
// import { useDispatch, useSelector } from "react-redux";
// import Feed from "./pages/Feed";
// import Profile from "./pages/Profile";
// import Connections from "./pages/Connections";
// import Requests from "./pages/Requests";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { addUser } from "../utils/userSlice";
// import { addConnections } from "../utils/connectionSlice"; // <-- 1. Import action
// import { useEffect, useState,} from "react"; 
// import ProfileView from "./components/ProfileView";
// import EditPassword from "./components/EditPassword";
// import ForgotPassword from "./components/ForgotPassword";
// import ChatPage from "./pages/ChatPage";
// import { Navbar2 } from "./components/Navbar2";




// function App() {
//   const [isLoading, setIsLoading] = useState(true); 
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userData = useSelector((store) => store?.user);
  


//   const fetchUser = async () => {
//     if (userData ) {
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const [profileRes, connectionsRes] = await Promise.all([
//         axios.get(BASE_URL + "/profile/view", { withCredentials: true }),
//         axios.get(BASE_URL + "/user/connections", { withCredentials: true }),
//       ]);
//       dispatch(addUser(profileRes.data));
//       dispatch(addConnections(connectionsRes.data?.data || []));
//         } catch (error) {
//       console.log("Error fetching user:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;

//     const publicRoutes = ["/login", "/signup", "/forgot/password"];

//     if (!userData && !publicRoutes.includes(location.pathname)) {
//       navigate("/login");
//     }

//     if (userData && publicRoutes.includes(location.pathname)) {
//       navigate("/");
//     }
//   }, [userData, location.pathname, navigate, isLoading]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] w-full">
//         <p className="text-xl text-white">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <> 

//      <div
//         className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat "
//         style={{
        

         
//           }}
//         >
//           <Navbar2 />
//         <div className="h-full w-full">
//           <Routes>
//             <Route path="/" element={<Feed />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/profile/view" element={<ProfileView />} />
//             <Route path="/requests" element={<Requests />} />
//             <Route path="/connections" element={<Connections />} />
//             <Route path="/password/edit" element={<EditPassword />} />
//             <Route path="/forgot/password" element={<ForgotPassword />} />{" "}
//             <Route path="/chat/:userId" element={<ChatPage />} />
//             <Route path="/chat" element={<ChatPage />} />
//           </Routes>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice";
import { useEffect, useState, Suspense, lazy } from "react";
import { Navbar2 } from "./components/Navbar2";

const Login = lazy(() => import("./pages/LoginSignup"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));
const Connections = lazy(() => import("./pages/Connections"));
const Requests = lazy(() => import("./pages/Requests"));
const ProfileView = lazy(() => import("./components/ProfileView"));
const EditPassword = lazy(() => import("./components/EditPassword"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store?.user);

  const fetchUser = async () => {
    if (userData) {
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
      if (error.response?.status === 401) {
        dispatch(addUser(null));       // clear user
        dispatch(addConnections([]));  // clear connections
      }
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
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] w-full">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
    >
      <Navbar2 />
      <div className="h-full w-full">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] w-full">
              <p className="text-xl text-white">Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/view" element={<ProfileView />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/password/edit" element={<EditPassword />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/chat/:userId" element={<ChatPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
