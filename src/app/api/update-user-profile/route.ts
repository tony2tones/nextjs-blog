import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import { verify } from "jsonwebtoken";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";

export async function POST(req:Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;
  
  if(!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as {userId: string};
    const user = await prisma.user.findUnique({
      where: {id: decoded.userId},
      include: {"image": true},
    });

    if(!user) {
      return NextResponse.json({error: 'User not found'}, {status: 400});
    }
    console.log(user);
  }
  catch(error) {
    console.log(error)
  }
  
  
  try {
    const formData = await req.formData();
    
    const username = formData.get('username')?.toString();
    const file = formData.get('image') as File | null;

    let imageData = null;

    if(file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({ 'resource_type': "image"}, (err, result) => {
          if(err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        }).end(buffer);
      });
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const { public_id, format, version, userId } = upload as any;

      imageData = await prisma.image.upsert({
        where: {userId},
        update: {publicId: public_id, format, version},
        create: {publicId:public_id, format, version, userId},
      });

    const updateUser = await prisma.user.update({
      where: {id: userId},
      data: {
        name: username ?? undefined,
      },
    include: { image: true },
    })
    return NextResponse.json({success:true, user:updateUser , image: imageData })
  }
 } catch {
    return NextResponse.json({error:"Invalid token"}, {status: 401});
  }

}