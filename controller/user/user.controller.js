import { User } from "../../model/user.model.js";
import { db } from "../../config/mongoose.js";
import bcrypt from 'bcrypt';
import passport from "passport";

export default class UserController {

    // Render the sign-up page
    getSignUp(req, res) {
        if(req.isAuthenticated()){
          return  res.redirect('/home');
        }
        res.render('signup', { title: "Sign Up" });
    }

    // Render the sign-in page
    getSignIn(req, res) {
        if(req.isAuthenticated()){
           return res.redirect('/home');
        }
        res.render('signin', { title: "Sign In" });
    }

    // Render the home page, passing the user's email if available
    getHome(req, res) {
        // const user = req.session.user;
        res.render('home', { title: 'Home Page', user: req.user });
    }

    // Render the reset password page
    getReset(req, res) {
        res.render('resetpassword', { title: 'Reset Password', user: req.user });
    }

    // Handling reset password 
    async postResetPassword(req, res) {
        try {
            const { new_password, confirm_new_password } = req.body;

            // Check if new_password and confirm_new_password match
            if (new_password !== confirm_new_password) {
                req.flash('error' ,'password do not match')
                return res.redirect('/getreset');
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(new_password, 12);

            // Update the user's password in the database
            await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });

            // Redirect to the home page or any other appropriate page
            req.flash('success' ,'password updated')
            res.redirect('back');
        } catch (error) {
            console.error("Error during password reset:", error);
            res.redirect('/');
        }
    }

    // Create a new user
    async postSignUp(req, res) {
        try {
            const { name, email, password, confirm_password } = req.body;

            // Check if password and confirm_password match
            if (password !== confirm_password) {
                req.flash('error', 'Passwords do not match');
                return res.redirect('/signup');
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            req.flash('success', 'Registration successful. You can now sign in.');
          
            res.redirect('/');
        } catch (error) {
            console.error("Error during sign-up:", error);
            res.redirect('/');
        }
    }

    // Handle user sign-in
    async postSignIn(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (!user) {
                req.flash('error', 'Username/Password invalid'); 
                console.error("Invalid email or password");
                return res.redirect('/');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success', 'Login successful');
                return res.redirect('/home');
            });
        })(req, res, next);
    }

    // Handle user logout
    logout(req, res) {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }
            req.flash('success', 'Logged out successfully');
            res.redirect('/');
        });
    }
}
