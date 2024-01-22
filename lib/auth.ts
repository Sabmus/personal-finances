import NextAuth from 'next-auth';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '@/lib/clientPromise';
import CredentialsProvider from 'next-auth/providers/credentials';
// import dbConnect from '@/lib/dbConn';
// import { User } from '@/db/models';
// import bcrypt from 'bcrypt';
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config';
// import { z } from 'zod';
// import GitHub from 'next-auth/providers/github';

/* const getUser = async (email: string) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
};
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  //   adapter: MongoDBAdapter(clientPromise),
  //   session: {
  //     strategy: 'jwt',
  //   },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      async authorize(credentials) {
        /* const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(4),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return null;

        delete user.password;
        return user; */
        return null;
      },
    }),
  ],
});
