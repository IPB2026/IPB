import type { NextAuthConfig } from 'next-auth';

/**
 * Configuration Auth.js *edge-safe* (sans Prisma ni bcrypt).
 * Utilisée par le middleware pour protéger /admin sans charger
 * de code Node dans le runtime Edge.
 *
 * La config complète (provider credentials + Prisma) vit dans auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [],
  callbacks: {
    /**
     * Autorise l'accès à /admin uniquement si connecté.
     * Auth.js redirige automatiquement vers la page signIn sinon.
     */
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/admin/login');

      if (isOnLogin) {
        // Déjà connecté → rediriger vers le tableau de bord
        if (isLoggedIn) {
          return Response.redirect(new URL('/admin', nextUrl));
        }
        return true;
      }

      if (isOnAdmin) {
        // On ne gate au middleware que les navigations GET. Les Server Actions
        // (POST) passent : elles vérifient elles-mêmes auth() côté serveur, et
        // le layout /admin protège l'accès. Évite que le middleware Edge
        // n'intercepte/redirige les POST d'actions (incompat. connue Auth.js v5).
        if (request.method !== 'GET') return true;
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
