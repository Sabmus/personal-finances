import { createInitialCategory, createInitialPaymentMethod } from '@/lib/data';

interface INewUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
}

export const authConfig = {
  /*pages: {
    signIn: '/login',
  },*/
  providers: [],
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub,
        };
      }
      return session;
    },
    // TODO: type auth, request
    authorized({ auth, request }: { auth: any; request: any }) {
      const user = auth?.user;

      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/api/auth/signin');
      const isOnDashboardPage = request.nextUrl?.pathname.startsWith('/dashboard');

      if (isOnLoginPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      if (isOnDashboardPage && !user) {
        return false;
      }

      return true;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      // console.log('signIn', { user, account, profile, email, credentials });

      return true;
    },
    /*   async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log('jwt', { token, user, isNewUser });
      return token;
    }, */
  },
  events: {
    /*     async signIn({ user, isNewUser }: any) {
      console.log('signIn', { user, isNewUser });
      return;
    }, */
    async createUser({ user }: { user: INewUser }) {
      console.log('\n\n⚠⚠ creating initial category ⚠⚠\n\n');
      await createInitialCategory(user.id);
      console.log('\n✨✨ initial category created succesfully ✨✨\n');
      console.log('\n⚠⚠ creating initial payment method ⚠⚠\n');
      await createInitialPaymentMethod(user.id);
      console.log('\n\n✨✨ initial payment method created succesfully ✨✨\n\n');
      return;
    },
  },
};
