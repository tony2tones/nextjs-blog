import jwt from 'jsonwebtoken';

export interface AuthenticatedUser {
  userId: string;
  email:string;
}

export function verifyToken(token:string): AuthenticatedUser | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedUser;
  } catch {
    console.log('invalid token');
    return null;
  }
}