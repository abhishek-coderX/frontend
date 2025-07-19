
import { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">⚓</div>
          <h2 className="text-2xl font-bold mb-2">No Crew Found</h2>
          <p>Start connecting with fellow developers!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">⚓ Your Crew</h1>
          {/* <p>
            {connections.length} developer
            {connections.length !== 1 ? "s" : ""} in your network
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
            } = connection;

            return (
              <div
                key={_id}
                className="bg-gray-800 rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={photoUrl || "https://via.placeholder.com/64"}
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {age} • {gender}
                    </p>
                  </div>
                  <div>
                   {/* view profile and message feature banana hai */}
                  </div>
                  
                </div>
                <p>{about}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
