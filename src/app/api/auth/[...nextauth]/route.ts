import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // ── Providers ─────────────────────────────────────────────────────────────
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ── Session strategy: JWT (no database required) ──────────────────────────
  // When you add a database, switch to: strategy: "database"
  // and add a database adapter (e.g. PrismaAdapter, DrizzleAdapter, etc.)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ── Custom pages ──────────────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error: "/login",   // Redirect auth errors to login page (query: ?error=...)
  },

  // ── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    // Expose user id in the session object on the client
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },

    // Forward extra token fields to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  // ── Secret ────────────────────────────────────────────────────────────────
  // Must match NEXTAUTH_SECRET in .env.local
  secret: process.env.NEXTAUTH_SECRET,

  // ── Debug in development ───────────────────────────────────────────────────
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
