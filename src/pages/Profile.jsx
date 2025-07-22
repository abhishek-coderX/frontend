import React from 'react'
import { useSelector } from 'react-redux'
import ProfileEdit from '../components/ProfileEdit'

const Profile = () => {
  const user=useSelector((store)=>store.user)
  return (
    <div >
      <ProfileEdit user={user}/>
    </div>
  )
}

export default Profile

