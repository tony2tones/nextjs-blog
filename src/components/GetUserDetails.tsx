'use client'
import { useState, useEffect } from "react";
import UserProfileForm from "./UserProfileForm";

type CloudinaryImage = {
  publicId: string;
  version: string;
  format: string;
  imageId: string;
  userId: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  image?: CloudinaryImage | null;
};

export default function GetUserDetails({userData: userDetails}:{userData:User}) {
const [userDataInfo, setUserDataInfo] = useState<User>(userDetails);
console.log(userDataInfo)
useEffect(() => {
  async function getUserDetails() {
    console.log('does this happen')
    const res = await fetch(`/api/user/${userDetails.id}`);
    if(!res.ok) {
      return;
    }
    const data = await res.json();
    console.log(data)
    setUserDataInfo(data)
  }
  getUserDetails();
}, [userDetails])

if(!userDataInfo) {
  return <div>User details not found.</div>
}

  return (
    <>
    <UserProfileForm user={userDataInfo} />
    </>
  )
}