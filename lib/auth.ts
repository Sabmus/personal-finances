import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config';

import { createInitialCategory, createInitialPaymentMethod, initialUserData } from '@/lib/data';
import { NewUser } from '@/db/models/User';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      /* profile(profile) {
        return {
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
        }
      }, */
    }),
  ],
  /*   events: {
    async createUser({ user }: { user: NewUser }) {
      // console.log('\n\n⚠⚠ creating initial category ⚠⚠\n\n');
      // await createInitialCategory(user.id);
      // console.log('\n✨✨ initial category created succesfully ✨✨\n');
      // console.log('\n⚠⚠ creating initial payment method ⚠⚠\n');
      // await createInitialPaymentMethod(user.id);
      // console.log('\n\n✨✨ initial payment method created succesfully ✨✨\n\n');
      await initialUserData(user.id);
    },
  }, */
});
