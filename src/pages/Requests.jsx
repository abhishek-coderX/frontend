import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../../utils/requestSlice'
import { useEffect } from 'react'

const Requests = () => {
  const dispatch=useDispatch()
  const requests=useSelector((store)=>store.requests)

  const reviewRequests=async(status,_id)=>{
    try {
      const res=await axios.post(BASE_URL+"/request/review/" + status + "/" + _id,{},{withCredentials:true})
      dispatch(removeRequests(_id))
    } catch (error) {
      console.log(error);
    }
  }





  const fetchRequests=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
    dispatch(addRequests(res?.data?.data))
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(()=>{
    fetchRequests()
  },[])


  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 text-gray-100 bg-center bg-cover"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">⚓</div>
          <h2 className="text-2xl font-bold mb-2">No Request found</h2>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-6 bg-center bg-cover"
      style={{ backgroundImage: "url('/sky3.jpg')" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">🛎️ Pending Requests</h1>

        <div className="space-y-4">
          {requests?.map((req) => {
            const { _id, fromUserId } = req;
            const {
              
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about
            } = fromUserId || {};

            return (
              <div
                key={_id}
                className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6 hover:bg-slate-750 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={photoUrl || "https://placehold.co/64x64"}
                      alt={`${firstName} ${lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-white mb-1">
                        {firstName} {lastName}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-slate-400 mb-2">
                        <span className="bg-slate-700 px-2 py-1 rounded-md">{age} years</span>
                        <span className="bg-slate-700 px-2 py-1 rounded-md">{gender}</span>
                      </div>
                      {about && (
                        <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                          {about}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 ml-4">
                    <button onClick={()=>reviewRequests("accepted",_id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-md">
                      Accept
                    </button>
                    <button onClick={()=>reviewRequests("rejected",_id)} className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-md">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Requests
