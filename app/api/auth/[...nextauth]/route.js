import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { DetailsModel } from "@/models/user";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
                email:{label:'email:',type:"email",placeholder:"email"},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                if (!credentials || !credentials.email || !credentials.password) {
                    console.log('Authorize: Missing credentials');
                    return null; // Indicate failure: missing input
                  }
                const User = await DetailsModel();
                const user = await User.findOne({ email: credentials.email });
                // const user = await db.collection("users").findOne({ email: credentials.email });
                console.log(user);
                console.log("botta");
                if (!user) {
                    console.log(`Authorize: No user found for email: ${credentials.email}`);
                    return null; // Indicate failure: user not found
                }
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    console.log(`Authorize: Invalid password for email: ${credentials.email}`);
                    return null;
                }
              
                return { id: user._id.toString(), name: user.username, email: user.email };
                

            },
        }),
    ],
    session: {
        strategy: "jwt",  // or "database" (if you have a dedicated session DB)
    },
    secret: process.env.NEXTAUTH_SECRET, //VERY IMPORTANT: secure your app
    callbacks: {
        jwt: async ({ token, user }) => {
            // Persist the userId to the token when signing in (only the first time)
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            // Send properties to the client session
            session.user.id = token.uid;  // Attach user ID to the session
            return session;
        },
    },
    pages: {
        signIn: '/login',    
    },
    
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

