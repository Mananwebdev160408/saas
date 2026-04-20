import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// ─── Detect if a database is configured ──────────────────────────────────────
// The app runs in JWT mode (no DB) until DATABASE_URL is set.
// Once you have PostgreSQL running, set DATABASE_URL in .env.local,
// run `npx prisma migrate dev`, and the adapter switches on automatically.

const hasDatabase = !!process.env.DATABASE_URL;

export const authOptions: NextAuthOptions = {
  // ── Adapter (only active when DATABASE_URL is set) ────────────────────────
  ...(hasDatabase ? { adapter: PrismaAdapter(prisma) as any } : {}),

  // ── Providers ─────────────────────────────────────────────────────────────
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ── Session strategy ──────────────────────────────────────────────────────
  // "jwt"      → cookie-based, no DB needed (current default)
  // "database" → DB-backed sessions via Prisma (auto-switches when DB is set)
  session: {
    strategy: hasDatabase ? "database" : "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ── Custom pages ──────────────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        // JWT mode: user id comes from token.sub
        // DB mode: user id comes from user.id
        (session.user as any).id = hasDatabase ? user?.id : token?.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },

  // ── Secret ────────────────────────────────────────────────────────────────
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
