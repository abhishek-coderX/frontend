// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../../utils/constants";
// import { addUser } from "../../utils/userSlice";
// import UserCards from "./UserCards";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProfileEdit = ({ user }) => {
//   const dispatch = useDispatch();
//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");
//   const [age, setAge] = useState(user?.age || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
//   const [about, setAbout] = useState(user?.about || "");
//   const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
//   const [errors, setErrors] = useState(null);
//   const [showToast, setShowToast] = useState(false);
//   const navigate=useNavigate()
//   const SaveProfile = async () => {
    
//     try {
//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         {
//           firstName,
//           lastName,
//           age,
//           gender,
//           photoUrl,
//           about,
//           skills: skills
//             .split(",")
//             .map((s) => s.trim())
//             .filter(Boolean),
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res?.data?.data));
//       setShowToast(true);
      
//       setTimeout(() => {
//         setShowToast(false);
//         navigate("/profile/view")
//       }, 3000);
//     } catch (error) {
//       setErrors(error?.response?.data);
//       setTimeout(() => {
//         setErrors(null);
//       }, 3000);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col md:flex-row justify-evenly items-center p-4 dark:bg-gray-900">
//       <div className="grid gap-x-6 gap-y-5 p-4 border-2 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 dark:text-gray-100 overflow-hidden transform hover:scale-105 transition-transform duration-300">
//         {[
//           {
//             label: "First Name",
//             id: "firstName",
//             value: firstName,
//             setValue: setFirstName,
//             type: "text",
//             placeholder: "Enter first name",
//           },
//           {
//             label: "Last Name",
//             id: "lastName",
//             value: lastName,
//             setValue: setLastName,
//             type: "text",
//             placeholder: "Enter last name",
//           },
//           {
//             label: "Age",
//             id: "age",
//             value: age,
//             setValue: setAge,
//             type: "number",
//             placeholder: "Your age",
//           },
//         ].map((field) => (
//           <div key={field.id}>
//             <label
//               htmlFor={field.id}
//               className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
//             >
//               {field.label}
//             </label>
//             <div className="mt-1">
//               <input
//                 type={field.type}
//                 id={field.id}
//                 value={field.value}
//                 onChange={(e) => field.setValue(e.target.value)}
//                 className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//                 placeholder={field.placeholder}
//               />
//             </div>
//           </div>
//         ))}

//         <div>
//           <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
//             Gender
//           </label>
//           <div className="mt-1">
//             <select
//               id="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="others">Others</option>
//             </select>
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label htmlFor="photoUrl" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
//             Photo URL
//           </label>
//           <div className="mt-1">
//             <input
//               type="text"
//               id="photoUrl"
//               value={photoUrl}
//               onChange={(e) => setPhotoUrl(e.target.value)}
//               className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//               placeholder="https://example.com/image.png"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label htmlFor="about" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
//             About
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="about"
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               rows={3}
//               className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//               placeholder="Write something about yourself"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
//             Skills (comma separated)
//           </label>
//           <div className="mt-1">
//             <input
//               type="text"
//               id="skills"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder:text-gray-400 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//               placeholder="e.g., React, Node.js, CSS"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2 mt-4">
//           <button
//             className="w-full p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
//             onClick={SaveProfile}
//           >
//             Save Profile
//           </button>
//           {errors && (
//             <div className="text-center mt-2 text-sm text-red-600 dark:text-red-400">
//               <p>{errors.message || errors || "An error occurred"}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-10 ">
//         <UserCards
//           user={{
//             photoUrl,
//             firstName,
//             lastName,
//             age,
//             about,
//             gender,
//             skills: skills
//               .split(",")
//               .map((s) => s.trim())
//               .filter((s) => s.length > 0),
//           }}
//         />
//       </div>

//       {showToast && (
//         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
//           Profile updated successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileEdit;



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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SaveProfile = async () => {
    setLoading(true);
    setErrors(null);

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
        navigate("/profile/view");
      }, 2000);
    } catch (error) {
      setErrors(error?.response?.data);
      setTimeout(() => {
        setErrors(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const skillsArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skillsArray.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills.join(", "));
  };

  const addSkill = (newSkill) => {
    if (newSkill && !skillsArray.includes(newSkill.trim())) {
      setSkills(skills ? `${skills}, ${newSkill.trim()}` : newSkill.trim());
    }
  };
return (
<div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-2 sm:p-4 md:p-8 bg-center bg-cover">

  <div className="max-w-7xl mx-auto mb-4 sm:mb-6 md:mb-8">
    <div className="breadcrumbs text-xs sm:text-sm">
      <ul>
        <li><a href="/profile/view" className="link link-hover text-primary">Profile</a></li>
        <li>Edit Profile</li>
      </ul>
    </div>
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content mt-2">Edit Your Profile</h1>
  </div>

  <div className="max-w-7xl pb-5  mx-auto grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">

    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body flex flex-col  sm:p-6">
        <div className="space-y-4 sm:space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label mb-2 font-semibold text-sm sm:text-base">First Name <span className="text-error">*</span></label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input border-none outline-none bg-base-200 focus:outline-none focus:border-none focus:ring-0" />
            </div>
            <div className="form-control">
              <label className="label mb-2 font-semibold text-sm sm:text-base">Last Name <span className="text-error">*</span></label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input border-none outline-none bg-base-200 focus:outline-none focus:border-none focus:ring-0" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label mb-2 font-semibold text-sm sm:text-base">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input border-none outline-none bg-base-200 focus:outline-none focus:border-none focus:ring-0" />
            </div>
            <div className="form-control">
              <label className="label mb-2 font-semibold text-sm sm:text-base">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="select border-none outline-none bg-base-200 focus:outline-none focus:border-none focus:ring-0">
                <option value="select">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
          
          <div className="form-control">
            <label className="label mb-2 font-semibold text-sm sm:text-base">Profile Photo URL</label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input border-none outline-none bg-base-200 w-full focus:outline-none focus:border-none focus:ring-0"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label  font-semibold text-sm sm:text-base mb-2">About Me</label>
            <textarea
              className="textarea border-none outline-none bg-base-200 h-14 sm:h-32 w-full resize-none focus:outline-none focus:border-none focus:ring-0"
              placeholder="Tell others about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label mb-2 font-semibold text-sm sm:text-base">Skills</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, Python"
              className="input border-none outline-none w-full bg-base-200 focus:outline-none focus:border-none focus:ring-0"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            
          </div>
        </div>
        
        {errors && (
          <div className="alert alert-error mt-4 sm:mt-6">
            <span className="text-sm">{errors || "An error occurred"}</span>
          </div>
        )}

        <div className="card-actions justify-start pt-4 sm:pt-6 mt-auto border-t border-base-300 flex-col sm:flex-row gap-4 sm:gap-0">
          <button className="btn btn-ghost w-full sm:w-auto order-2 mr-2 sm:order-1" onClick={() => navigate("/profile/view")}>Cancel</button>
          <button
            className={`btn btn-primary w-full sm:w-auto order-1 sm:order-2 ${loading ? 'loading' : ''}`}
            onClick={SaveProfile}
            disabled={loading || !firstName || !lastName}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>

    <div className="card p-4   h-full bg-base-100 shadow-xl">
      <div className="card-body sm:p-6">
        <h2 className="card-title text-base-content/80 text-base sm:text-lg">
          Live Preview
        </h2>
        <div className="divider "></div>
       <div className="ml-33 ">
        <UserCards 
          user={{
            photoUrl,
            firstName,
            lastName,
            age,
            about,
            gender,
            skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
          }}
        /></div>
      </div>
    </div>
    
  </div>

  {showToast && (
    <div className="toast toast-end">
      <div className="alert alert-success">
        <span className="text-sm">Profile updated successfully!</span>
      </div>
    </div>
  )}
</div>
);
};

export default ProfileEdit;
