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
  },
};
