'use client'
import UserProfileForm from "./UserProfileForm";

// type CloudinaryImage = {
//   publicId: string;
//   version: string;
//   format: string;
//   imageId: string;
//   userId: string;
// };

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   image?: CloudinaryImage | null;
// };

export default function GetUserDetails() {

  return (
    <>
    {/* {loading ? (
            <Loader />
          ) : ( */}
            <UserProfileForm />
          {/* )} */}
    </>
  )
}