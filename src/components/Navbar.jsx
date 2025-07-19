import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/userSlice';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

const handleLogout = async () => {
  try {
    await axios.post(BASE_URL + "/logout", {}, {
      withCredentials: true,
    });

    dispatch(removeUser()); 
    navigate("/login"); 
  } catch (error) {
    console.error("Logout failed", error);
  }
};


  const handleProfile = () => {
    setDropdownOpen(false);
    navigate('/profile/view');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-blue-500 shadow-md px-4 md:px-6 text-white">
      <div className="flex-1">
        <button
          className="text-xl md:text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
          onClick={() => navigate('/')}
        >
          ⚓ CrewMates
        </button>
      </div>

      <div className="flex gap-3 md:gap-6 items-center font-semibold">
        <button onClick={() => navigate('/connections')} className="hover:text-yellow-300 text-sm md:text-base transition-colors">
          Connections
        </button>
        <button onClick={() => navigate('/requests')} className="hover:text-yellow-300 text-sm md:text-base transition-colors">
          Requests
        </button>

       
        {user && (
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border-2 border-transparent hover:border-yellow-300 rounded-full p-1 transition"
            >
             
              <img
                src={user.photoUrl || 'https://placehold.co/40x40/f87171/ffffff?text=U'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/f87171/ffffff?text=U'; }}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
