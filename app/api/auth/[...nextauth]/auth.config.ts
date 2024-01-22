export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    /*     async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub,
        };
      }
      return session;
    }, */
    authorized({ auth, request }: { auth: any; request: any }) {
      const user = auth?.user;

      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');
      const isOnAdminPage = request.nextUrl?.pathname.startsWith('/admin');

      if (isOnLoginPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      if (isOnAdminPage && !user) {
        return false;
      }

      return true;
    },
  },
};
