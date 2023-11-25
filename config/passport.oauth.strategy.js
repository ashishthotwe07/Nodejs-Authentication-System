import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../model/user.model.js';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();



const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;


//  Google OAuth strategy Configuration
passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: 'http://localhost:8000/oauth/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Find or create user based on the email
            let user = await User.findOne({ email: profile.emails[0].value });

            if (!user) {
                // If user doesn't exist, create a new user
                const hashedPassword = await bcrypt.hash(profile.id, 12); // Use Google profile ID as the password
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: hashedPassword,
                });
                // Save the new user to the database
                await user.save();
            }

            // Return user information to be stored in the session
            return done(null, user);
        } catch (err) {
            console.error('Error in Google OAuth Callback:', err);
            // Pass the error to the callback
            return done(err);
        }
    }
));

// Export the configured passport instance
export default passport;
