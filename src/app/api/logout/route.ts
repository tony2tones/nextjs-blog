import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({message: 'User is logged out'});

  response.cookies.set({
    name:'token',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  return response;
}