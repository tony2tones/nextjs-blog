import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {prisma} from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:{label:'Email', type: 'email'},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {email:credentials?.email}
        });

        if(!user || !credentials?.password) throw new Error('Invalid credentials');

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if(!isValid) throw new Error('Invalid credentials');
        console.log('USER DEETS',user)
        return user;
      },
      }),
  ],
  session: {strategy: 'jwt'},
  callbacks: {
    async session((session, user)) {
      if(user) session.user.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET;
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


}