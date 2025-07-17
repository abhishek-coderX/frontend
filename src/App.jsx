import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {Provider} from "react-redux"
import appStore from "../utils/appStore";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections"
import Requests from "./pages/Requests";
function App() {
  return (

    
    <> 
    <Provider store={appStore}>
    <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/connections" element={<Connections/>} />

        </Routes>
      </BrowserRouter>
    </Provider>
    </>
    
  );
}

export default App;
