import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
                console.log("credentials verified");
                console.log(user);
                if (!user) {
                    console.log(`Authorize: No user found for email: ${credentials.email}`);
                    return null; // Indicate failure: user not found
                }
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    console.log(`Authorize: Invalid password for email: ${credentials.email}`);
                    return null;
                }
                console.log("user successfully authenticated");
                
              
                return { id: user._id.toString(), name: user.username, email: user.email };
                // if it is successful then we return user object where nextauth uses this user object to create "jwt"
                

            },
        }),
    ],
    session: {
        strategy: "jwt",   // or "database" (if you have a dedicated session DB)
        maxAge: 60*60, // 1 hour in seconds 
    },
    secret: process.env.NEXTAUTH_SECRET, //VERY IMPORTANT: secure your app

    //callbacks here are middleware functions
    callbacks: {
        jwt: async ({ token, user }) => {
            // Persist the userId to the token when signing in (only the first time)
             // 'user' is the object that came from the authorize function 
            if (user) {
                token.uid = user.id;
                token.email = user.email;
            } 
            return token; //The token object represents the JWT payload.
            // The token returned from this callback is what NextAuth.js will sign and place into the HTTP-only cookie.
        },
        session: async ({ session, token }) => {
            //Purpose: To modify the client-side session object (session) that your React components will receive. 
            //It's about deciding what information from the JWT (token) should be exposed to the client.
            //If the token is successfully verified, NextAuth then calls your session callback. The purpose of this callback is to control what information from the token is exposed to the client-side session object (which you access with the useSession hook).
            session.user.id = token.uid;
            session.user.email = token.email;  // Attach user ID to the session
            return session;
        },
    },
    pages: {
        signIn: '/login',    
    },
    
};

const handler = NextAuth(authOptions);  //This creates the NextAuth.js API route handler.

export { handler as GET, handler as POST }



// Login:
// User Credentials -> authorize() -> User Object {id, name} -> JWT Created -> jwt() callback adds uid -> Token Signed with Secret -> Cookie sent to Client
// Authenticated Request:
// Client sends Cookie -> Server receives JWT -> Verify Signature & Expiration -> session() callback adds id to session -> Session data available to App



// User logs in →
//   authorize() in CredentialsProvider validates user →
//     returns { id, name, email }
//       ↓
// NextAuth creates JWT (if `strategy: "jwt"`) →
//   jwt() callback runs:
//     token = { name, email, picture, sub, **uid** } → token returned
//       ↓
// JWT is signed with secret and placed in a cookie
//       ↓
// Client makes authenticated requests →
//   Server verifies JWT from cookie →
//     session() callback runs:
//       builds session from token →
//       session.user.id = token.uid
//         ↓
// Returned to client via useSession()



// JWT is the information (the identity proof, the credentials, the data payload).
// Cookie is the vehicle (the mechanism to carry and store that JWT between the server and the browser).
