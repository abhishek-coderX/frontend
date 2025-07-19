import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);


  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
  const publicRoutes = ["/login", "/signup"];
  
  if (userData === undefined) return; 
  
  if (!userData && !publicRoutes.includes(location.pathname)) {
    navigate("/login");
  }

  if (userData && publicRoutes.includes(location.pathname)) {
    navigate("/");
  }
}, [userData, location.pathname, navigate]);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/connections" element={<Connections />} />
      </Routes>
    </>
  );
}

export default App;
