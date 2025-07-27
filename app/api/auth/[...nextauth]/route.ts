import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password")
        }

        // Temporary hardcoded admin for development (remove in production)
        if (credentials.username === "admin" && credentials.password === "admin123") {
          return {
            id: "1",
            name: "Administrator",
            email: "admin@han-education.com",
            role: "admin",
          }
        }

        try {
          await connectToDatabase()

          // Find user by username
          const user = await User.findOne({ username: credentials.username })

          // If no user found or password doesn't match
          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new Error("Invalid username or password")
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("Database connection failed, using fallback admin")
          // If database fails, still allow admin login
          if (credentials.username === "admin" && credentials.password === "admin123") {
            return {
              id: "1",
              name: "Administrator",
              email: "admin@han-education.com",
              role: "admin",
            }
          }
          throw new Error("Invalid username or password")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
}

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST, authOptions }
