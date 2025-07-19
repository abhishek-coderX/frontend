import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";
import UserCards from "./UserCards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [errors, setErrors] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate=useNavigate()
  const SaveProfile = async () => {
    
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
        navigate("/profile/view")
      }, 3000);
    } catch (error) {
      setErrors(error?.response?.data);
      setTimeout(() => {
        setErrors(null);
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-evenly items-center p-4 dark:bg-gray-900">
      <div className="grid gap-x-6 gap-y-5 p-4 border-2 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 dark:text-gray-100 overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {[
          {
            label: "First Name",
            id: "firstName",
            value: firstName,
            setValue: setFirstName,
            type: "text",
            placeholder: "Enter first name",
          },
          {
            label: "Last Name",
            id: "lastName",
            value: lastName,
            setValue: setLastName,
            type: "text",
            placeholder: "Enter last name",
          },
          {
            label: "Age",
            id: "age",
            value: age,
            setValue: setAge,
            type: "number",
            placeholder: "Your age",
          },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              {field.label}
            </label>
            <div className="mt-1">
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}

        <div>
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Gender
          </label>
          <div className="mt-1">
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="photoUrl" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Photo URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="about" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            About
          </label>
          <div className="mt-1">
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Write something about yourself"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Skills (comma separated)
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="e.g., React, Node.js, CSS"
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            className="w-full p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            onClick={SaveProfile}
          >
            Save Profile
          </button>
          {errors && (
            <div className="text-center mt-2 text-sm text-red-600 dark:text-red-400">
              <p>{errors.message || errors || "An error occurred"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 ">
        <UserCards
          user={{
            photoUrl,
            firstName,
            lastName,
            age,
            about,
            gender,
            skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s.length > 0),
          }}
        />
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
