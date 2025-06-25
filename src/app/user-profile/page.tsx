
import GetUserDetails from "@/components/GetUserDetails";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";

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
  image?: CloudinaryImage|null;
};

export default async function UserProfile() {
const cookieStore = cookies();
const token =  (await (cookieStore)).get('token')?.value;
let user: User| null = null;
if(!token) {
  return null;
}
try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId:string};
  
  user = await prisma.User.findUnique({
        where: { id: decoded.userId},
        select : {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      });

} catch (err) {
  console.log(err);
  return null;
}

if(!user) {
  return <div>User details not found.</div>
}

  return (
    <>
    <div className="flex flex-col items-center">
    <h1>Profile page</h1>
    <GetUserDetails userData={user} />
    </div>
    </>
  )
}