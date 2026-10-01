import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminRoute =
        nextUrl.pathname === '/meetings/new' ||
        /^\/meetings\/[^/]+\/edit$/.test(nextUrl.pathname);

      if (isOnAdminRoute) {
        return isLoggedIn;
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [],
};